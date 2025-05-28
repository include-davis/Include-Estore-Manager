import revalidateCache from '@actions/revalidateCache';
import prisma from '../_prisma/client';
import { OrderInput, OrderProductInput } from '@datatypes/Order';
import { ApolloContext } from '../apolloServer';

export default class Orders {
  //CREATE
  static async create(input: OrderInput, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    const order = prisma.order.create({
      data: {
        ...input, // Spread the input fields
        status: 'pending', // Default status
        created_at: new Date(), // Current timestamp
      },
    });
    revalidateCache(['orders']);
    return order;
  }

  //READ -> get order and orders, also getProducts using the ProductToOrder table

  static async find(id: string, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    return prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  static async findMany(ids: string[], ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    if (!ids) {
      return prisma.order.findMany();
    }

    return prisma.order.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  static async getProducts(order_id: string, ctx: ApolloContext) {
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
  static async update(id: string, input: OrderInput, ctx: ApolloContext) {
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
    id: string,
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
    id: string,
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
    id: string,
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
  static async delete(id: string, ctx: ApolloContext) {
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
    // calculate cart total
    // create new order w/createOrder
    // stripe paymentintent
    // update order w/ paymentintent id
    // return order w/ client_secret
  }
}
