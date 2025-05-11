import revalidateCache from '@actions/revalidateCache';
import prisma from '../_prisma/client';
import { UserInput } from '@datatypes/User';
import { ApolloContext } from '@datalib/apolloServer';

export default class Users {
  // CREATE
  static async create(input: UserInput, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    const user = await prisma.user.create({
      data: input,
    });
    revalidateCache(['users']);
    return user;
  }

  // READ
  static async find(id: string, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  static async findMany(ids: string[], ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

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
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

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
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

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
