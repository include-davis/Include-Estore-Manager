import revalidateCache from '@actions/revalidateCache';
import prisma from '../_prisma/client';
import { UserInput } from '@datatypes/User';
import { ApolloContext } from '@datalib/apolloServer';

export default class Users {
  // CREATE
  static async create(input: UserInput, ctx: ApolloContext) {
    if (!ctx.isOwner) return null; // TODO: Possibly some better error message.

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
  static async update(id: string, input: UserInput, ctx: ApolloContext) {
    if (!ctx.isOwner) return null; // TODO: Possibly some better error message.

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
  static async delete(id: string, ctx: ApolloContext) {
    if (!ctx.isOwner) return null; // TODO: Possibly some better error message.

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
