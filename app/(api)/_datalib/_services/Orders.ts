import revalidateCache from '@actions/revalidateCache';
import prisma from '../_prisma/client';
import { OrderInput, OrderProductInput } from '@datatypes/Order';
import { ApolloContext } from '../apolloServer';
import { Prisma } from '@prisma/client';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-05-28.basil', // explicitly set the API version
// });

export default class Orders {
  //CREATE
  static async create(input: OrderInput, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    const order = prisma.order.create({
      data: {
        ...input, // Spread the input fields
        total: 0,
        status: 'pending', // Default status
        created_at: new Date(), // Current timestamp
      },
    });
    revalidateCache(['orders']);
    return order;
  }

  //READ -> get order and orders, also getProducts using the ProductToOrder table
  static async find(id: number, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    return prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  static async findMany(
    statuses: string[],
    search: string,
    offset: number,
    limit: number,
    ctx: ApolloContext
  ) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    if (offset < 0 || limit <= 0) return null;

    const whereClause: Prisma.OrderWhereInput = {};

    if (statuses && statuses.length > 0) {
      whereClause.status = { in: statuses };
    }

    if (search) {
      const searchConditions: Prisma.OrderWhereInput[] = [
        { customer_name: { contains: search, mode: 'insensitive' } },
        { customer_email: { contains: search, mode: 'insensitive' } },
        { customer_phone_num: { contains: search, mode: 'insensitive' } },
      ];

      const searchAsNumber = parseInt(search, 10);
      if (!isNaN(searchAsNumber)) {
        searchConditions.push({ id: searchAsNumber });
        searchConditions.push({
          id: {
            in: await prisma.order
              .findMany({
                select: { id: true },
              })
              .then((orders) =>
                orders
                  .filter((order) => order.id.toString().includes(search))
                  .map((order) => order.id)
              ),
          },
        });
      }

      whereClause.OR = searchConditions;
    }

    return prisma.order.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc',
      },
      skip: offset * limit,
      take: limit,
    });
  }

  static async getProducts(order_id: number, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    const productToOrder = await prisma.productToOrder.findMany({
      where: {
        order_id,
      },
      include: {
        product: true,
      },
    });

    const orderProducts = productToOrder.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    return orderProducts;
  }

  //UPDATE
  static async update(id: number, input: OrderInput, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    try {
      const order = await prisma.order.update({
        where: {
          id,
        },
        data: input,
      });
      revalidateCache(['orders', 'products']);
      return order;
    } catch (e) {
      return e;
    }
  }

  // these are the services for the mutations we have left
  static async addProductToOrder(
    id: number,
    productToAdd: OrderProductInput,
    ctx: ApolloContext
  ) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    try {
      const product_id = productToAdd.product_id;
      const productQuantity = productToAdd.quantity;

      const existingOrder = await prisma.productToOrder.findUnique({
        where: {
          id: {
            order_id: id,
            product_id: product_id,
          },
        },
      });

      if (existingOrder) {
        await prisma.productToOrder.update({
          where: {
            id: {
              order_id: id,
              product_id: product_id,
            },
          },
          data: {
            quantity: existingOrder.quantity + productQuantity,
          },
        });
      } else {
        await prisma.productToOrder.create({
          data: {
            order_id: id,
            product_id: product_id,
            quantity: productQuantity,
          },
        });
      }

      const updatedOrder = await prisma.order.findUnique({
        where: { id },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });
      revalidateCache(['products', 'orders']);
      return updatedOrder;
    } catch (e) {
      return e;
    }
  }

  static async removeProductFromOrder(
    id: number,
    product_id: string,
    ctx: ApolloContext
  ) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    try {
      await prisma.productToOrder.delete({
        where: {
          id: {
            order_id: id,
            product_id: product_id,
          },
        },
      });

      const updatedOrder = await prisma.order.findUnique({
        where: { id },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });

      revalidateCache(['products', 'orders']);
      return updatedOrder;
    } catch (e) {
      return e;
    }
  }

  static async editProductQuantity(
    id: number,
    productToUpdate: OrderProductInput,
    ctx: ApolloContext
  ) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    try {
      const product_id = productToUpdate.product_id;
      const productQuantity = productToUpdate.quantity;
      if (productQuantity <= 0)
        throw new Error('Quantity must be greater than 0');
      const order = await prisma.productToOrder.findUnique({
        where: {
          id: {
            order_id: id,
            product_id,
          },
        },
      });

      if (order) {
        await prisma.productToOrder.update({
          where: {
            id: {
              order_id: id,
              product_id: product_id,
            },
          },
          data: {
            quantity: productQuantity,
          },
        });
      }

      const updatedOrder = await prisma.order.findUnique({
        where: { id },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });
      revalidateCache(['products', 'orders']);
      return updatedOrder;
    } catch (e) {
      return e;
    }
  }

  // DELETE
  static async delete(id: number, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    try {
      const order = await prisma.order.findFirst({
        where: {
          id,
        },
        select: {
          status: true,
        },
      });

      if (order) {
        if (order.status == 'refunded') {
          await prisma.order.delete({
            where: {
              id,
            },
          });
          revalidateCache(['orders', 'products']);
          return true;
        } else {
          await prisma.order.update({
            where: {
              id,
            },
            data: {
              status: 'needs refund',
            },
          });
          // could possibly add a message? "this order need to be refunded" or smth
          revalidateCache(['orders']);
          return false;
        }
      }
    } catch (e) {
      return false;
    }
  }

  // PROCESS W/STRIPE
  static async processOrder(
    input: OrderInput,
    products: OrderProductInput[],
    ctx: ApolloContext
  ) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    return null;

    // try {
    //   // Lookup product prices from DB
    //   const productIds = products.map((p) => p.product_id);
    //   const dbProducts = await prisma.product.findMany({
    //     where: { id: { in: productIds } },
    //   });

    //   const productMap = Object.fromEntries(dbProducts.map((p) => [p.id, p]));

    //   const total = products.reduce((sum, item) => {
    //     const product = productMap[item.product_id];
    //     return sum + (product?.price ?? 0) * item.quantity;
    //   }, 0);

    //   // Stripe counts payment amounts in cents
    //   const amountInCents = Math.round(total * 100);

    //   // Create the order
    //   const createdOrder = await prisma.order.create({
    //     data: {
    //       ...input,
    //       total: total,
    //       status: 'pending',
    //       created_at: new Date(),
    //       products: {
    //         create: products.map((p) => ({
    //           quantity: p.quantity,
    //           product: { connect: { id: p.product_id } },
    //         })),
    //       },
    //     },
    //     include: { products: { include: { product: true } } },
    //   });

    //   // Create Stripe PaymentIntent
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: amountInCents,
    //     currency: 'usd',
    //     metadata: {
    //       orderId: createdOrder.id,
    //     },
    //   });

    //   // Save paymentIntentId to order
    //   const updatedOrder = await prisma.order.update({
    //     where: { id: createdOrder.id },
    //     data: { paymentIntentId: paymentIntent.id },
    //     include: { products: { include: { product: true } } },
    //   });

    //   revalidateCache(['orders', 'products']);

    //   return {
    //     order: updatedOrder,
    //     clientSecret: paymentIntent.client_secret,
    //   };
    // } catch (e) {
    //   return e;
    // }
  }
}
