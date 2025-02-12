import revalidateCache from '@actions/revalidateCache';
import prisma from '../_prisma/client';
import { OrderInput } from '@datatypes/Order';

export default class Orders {
  //CREATE
  //READ
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
