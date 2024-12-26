import { InventoryInput } from '@datatypes/Inventory';
import prisma from '../_prisma/client';

export default class Inventories {
  // READ
  static async find(id: string) {
    return prisma.inventory.findUnique({
      where: {
        id,
      },
    });
  }

  static async findMany(ids: string[]) {
    if (!ids) {
      return prisma.inventory.findMany();
    }

    return prisma.inventory.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  // UPDATE
  static async update(id: string, input: InventoryInput) {
    try {
      const inventory = await prisma.inventory.update({
        where: {
          id,
        },
        data: input,
      });
      return inventory;
    } catch (e) {
      return null;
    }
  }
}
