import { TagInput } from '@datatypes/Tag';
import prisma from '../_prisma/client';
import revalidateCache from '@actions/revalidateCache';
import { ApolloContext } from '@datalib/apolloServer';

export default class Tags {
  // CREATE
  static async create(input: TagInput, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    const tag = await prisma.tag.create({
      data: input,
    });
    revalidateCache(['tags', 'products']);
    return tag;
  }

  // READ
  static async find(name: string, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    return prisma.tag.findUnique({
      where: {
        name,
      },
    });
  }

  static async findMany(names: string[], ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    if (!names) {
      return prisma.tag.findMany();
    }

    return prisma.tag.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });
  }

  static async findProducts(tag_id: string, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    return prisma.productToTag.findMany({
      where: {
        tag_id,
      },
      include: {
        tag: true,
      },
    });
  }

  // DELETE
  static async delete(name: string, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    try {
      await prisma.tag.delete({
        where: {
          name,
        },
      });
      revalidateCache(['tags', 'products']);
      return true;
    } catch (e) {
      return false;
    }
  }
}
