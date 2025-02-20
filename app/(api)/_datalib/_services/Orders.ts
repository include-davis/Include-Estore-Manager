import revalidateCache from '@actions/revalidateCache';
import prisma from '../_prisma/client';
import { OrderInput } from '@datatypes/Order';

export default class Orders {
  //CREATE
  static async create(input: OrderInput) {
    return prisma.order.create({
      data: {
        ...input, // Spread the input fields
        status: 'pending', // Default status
        created_at: new Date(), // Current timestamp
      },
    });
  }

  //READ -> get order and orders, also getProducts using the ProductToOrder table

  static async find(id: string) {
    return prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  static async findMany(ids: string[]) {
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

  static async getProducts(order_id: string) {
    const productToOrder = await prisma.productToOrder.findMany({
      where: {
        order_id,
      },
      include: {
        product: true,
      },
    });

    return productToOrder.map((item) => item.product);
  }

  //UPDATE
  static async update(id: string, input: OrderInput) {
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
      return null;
    }
  }

  // these are the services for the mutations we have left
  // static async addProductToOrder(id: string, input: ProductInput) {}
  // static async removeProductFromOrder() {}
  // static async editProductQuantity() {}

  // DELETE
  static async delete(id: string) {
    try {
      await prisma.order.delete({
        where: {
          id,
        },
      });
      revalidateCache(['orders', 'products']);
      return true;
    } catch (e) {
      return false;
    }
  }
}
