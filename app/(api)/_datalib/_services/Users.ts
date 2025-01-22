import revalidateCache from '@actions/revalidateCache';
import prisma from '../_prisma/client';
import { UserInput } from '@datatypes/User';

export default class Users {
  // CREATE
  static async create(input: UserInput) {
    const user = await prisma.user.create({
      data: input,
    });
    revalidateCache(['users']);
    return user;
  }

  // READ
  static async find(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  static async findMany(ids: string[]) {
    if (!ids) {
      return prisma.user.findMany();
    }

    return prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  // UPDATE
  static async update(id: string, input: UserInput) {
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: input,
      });
      revalidateCache(['users']);
      return user;
    } catch (e) {
      return null;
    }
  }

  // DELETE
  static async delete(id: string) {
    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });
      revalidateCache(['users']);
      return true;
    } catch (e) {
      return false;
    }
  }
}
