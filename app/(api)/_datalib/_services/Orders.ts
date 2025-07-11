import revalidateCache from '@actions/revalidateCache';
import prisma from '../_prisma/client';
import {
  CancellationStatus,
  OrderInput,
  OrderProductInput,
  OrderStatus,
  OrderUpdateInput,
} from '@datatypes/Order';
import { ApolloContext } from '../apolloServer';
import { Prisma } from '@prisma/client';
import Stripe from 'stripe';

export default class Orders {
  //CREATE
  static async create(input: OrderInput, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    const order = prisma.order.create({
      data: {
        ...input, // Spread the input fields
        total: 0,
        status: OrderStatus.PENDING, // Default status
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
    statuses: OrderStatus[],
    cancellation_statuses: CancellationStatus[],
    search: string,
    offset: number,
    limit: number,
    ctx: ApolloContext
  ) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;
    if (offset < 0 || limit <= 0) return null;

    const queryConditions: Prisma.OrderWhereInput[] = [];

    const statusFilters: Prisma.OrderWhereInput[] = [];
    if (statuses?.length) {
      statusFilters.push({ status: { in: statuses } });
    }
    if (cancellation_statuses?.length) {
      statusFilters.push({
        cancellation_status: { in: cancellation_statuses },
      });
    }

    if (statusFilters.length > 1) {
      queryConditions.push({ OR: statusFilters });
    } else if (statusFilters.length === 1) {
      queryConditions.push(statusFilters[0]);
    }

    // For in progress requests, ensure there's no cancellation status.
    const isInProgressRequest =
      statuses?.length &&
      !cancellation_statuses?.length &&
      !statuses.includes(OrderStatus.DELIVERED);
    if (isInProgressRequest) {
      queryConditions.push({ cancellation_status: null });
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

      queryConditions.push({ OR: searchConditions });
    }

    return prisma.order.findMany({
      where: { AND: queryConditions },
      orderBy: {
        created_at: 'desc',
      },
      skip: offset,
      take: limit,
    });
  }

  static async count(
    statuses: OrderStatus[],
    cancellation_statuses: CancellationStatus[],
    search: string,
    ctx: ApolloContext
  ) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    const queryConditions: Prisma.OrderWhereInput[] = [];

    const statusFilters: Prisma.OrderWhereInput[] = [];
    if (statuses?.length) {
      statusFilters.push({ status: { in: statuses } });
    }
    if (cancellation_statuses?.length) {
      statusFilters.push({
        cancellation_status: { in: cancellation_statuses },
      });
    }

    if (statusFilters.length > 1) {
      queryConditions.push({ OR: statusFilters });
    } else if (statusFilters.length === 1) {
      queryConditions.push(statusFilters[0]);
    }

    const isInProgressRequest =
      statuses?.length &&
      !cancellation_statuses?.length &&
      !statuses.includes(OrderStatus.DELIVERED);
    if (isInProgressRequest) {
      queryConditions.push({ cancellation_status: null });
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

      queryConditions.push({ OR: searchConditions });
    }

    return prisma.order.count({
      where: { AND: queryConditions },
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
  static async update(id: number, input: OrderUpdateInput, ctx: ApolloContext) {
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
          cancellation_status: true,
        },
      });

      if (order) {
        if (order.cancellation_status == 'REFUNDED') {
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
              cancellation_status: CancellationStatus.CANCELLED,
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
    if (!ctx.isOwner && !ctx.hasValidApiKey) {
      throw new Error('Unauthorized');
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2025-05-28.basil',
    });

    let total = 0;
    await Promise.all(
      products.map(async (p) => {
        const product = await prisma.product.findUnique({
          where: { id: p.product_id },
        });
        if (!product) {
          throw new Error(`Product with ID ${p.product_id} not found`);
        }
        total += (product.price - (product.discount ?? 0)) * p.quantity;
      })
    );

    const order = await prisma.order.create({
      data: {
        ...input,
        total,
        status: OrderStatus.ORDERED,
        created_at: new Date(),
        products: {
          create: products.map((p) => ({
            product_id: p.product_id,
            quantity: p.quantity,
          })),
        },
      },
      include: {
        products: true,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'usd',
      metadata: {
        orderId: order.id,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentIntentId: paymentIntent.id },
    });

    revalidateCache(['orders']);
    return {
      order,
      clientSecret: paymentIntent.client_secret,
    };
  }
}
