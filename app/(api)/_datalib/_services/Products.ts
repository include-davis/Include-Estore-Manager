import revalidateCache from '@actions/revalidateCache';
import prisma from '../_prisma/client';
import { ProductInput, ProductInventoryInput } from '@datatypes/Product';
import { ApolloContext } from '@datalib/apolloServer';

export default class Products {
  // CREATE
  static async create(input: ProductInventoryInput, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    const { productInput, inventoryInput } = input;
    const {
      name,
      price,
      discount,
      description,
      details,
      weight,
      height,
      width,
      depth,
      special_label_needed,
    } = productInput;

    // single transaction to ensure both records get created
    const transaction = prisma.$transaction(async () => {
      return prisma.product.create({
        data: {
          name,
          price,
          discount,
          description,
          details,
          weight,
          height,
          width,
          depth,
          special_label_needed,
          inventory: {
            create: inventoryInput,
          },
        },
        include: {
          inventory: true,
        },
      });
    });
    revalidateCache(['products', 'inventories']);
    return transaction;
  }

  // READ
  static async find(id: string, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    return prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  static async findMany(ids: string[], ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    if (!ids) {
      return prisma.product.findMany();
    }

    return prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  static async getTags(product_id: string, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    const productToTag = await prisma.productToTag.findMany({
      where: {
        product_id,
      },
      include: {
        tag: true,
      },
    });

    return productToTag.map((item) => item.tag);
  }

  static async getOrders(product_id: string, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    const productToOrder = await prisma.productToOrder.findMany({
      where: {
        product_id,
      },
      include: {
        order: true,
      },
    });

    return productToOrder.map((item) => item.order);
  }

  // UPDATE
  static async update(id: string, input: ProductInput, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    try {
      const product = await prisma.product.update({
        where: {
          id,
        },
        data: input,
      });
      revalidateCache(['products', 'inventories']);
      return product;
    } catch (e) {
      return null;
    }
  }

  static async addTags(id: string, tagNames: string[], ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    try {
      const existingProduct = await prisma.product.findUnique({
        where: {
          id,
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      const existingTagNames = existingProduct!.tags.map((tag) => tag.tag.name);

      const newTagNames = tagNames.filter(
        (name) => !existingTagNames.includes(name)
      );

      if (newTagNames.length === 0) {
        return existingProduct;
      }

      const updatedProduct = prisma.product.update({
        where: {
          id,
        },
        data: {
          tags: {
            create: newTagNames.map((name) => ({
              tag: {
                connectOrCreate: {
                  where: { name },
                  create: { name },
                },
              },
            })),
          },
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
      revalidateCache(['products', 'tags']);
      return updatedProduct;
    } catch (e) {
      return null;
    }
  }

  static async removeTags(id: string, tagNames: string[], ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    const tags = await prisma.tag.findMany({
      where: {
        name: {
          in: tagNames,
        },
      },
      select: {
        id: true,
      },
    });

    const tagIds = tags.map((tag) => tag.id);

    const updatedProduct = prisma.product.update({
      where: {
        id,
      },
      data: {
        tags: {
          deleteMany: {
            tag_id: {
              in: tagIds,
            },
          },
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    revalidateCache(['products', 'tags']);
    return updatedProduct;
  }

  // DELETE
  static async delete(id: string, ctx: ApolloContext) {
    if (!ctx.isOwner && !ctx.hasValidApiKey) return null;

    try {
      await prisma.product.delete({
        where: {
          id,
        },
      });
      revalidateCache(['products', 'inventories']);
      return true;
    } catch (e) {
      return false;
    }
  }
}
