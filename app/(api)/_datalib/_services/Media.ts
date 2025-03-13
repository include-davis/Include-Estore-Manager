import prisma from '../_prisma/client';
import { MediaInput } from '@datatypes/Media';
export default class MediaService {
  // CREATE
  static async create(input: MediaInput) {
    const media = await prisma.media.create({
      data: {
        cloudinary_id: input.cloudinary_id,
        name: input.name,
        type: input.type,
        format: input.format,
        src: input.src,
        alt: input.alt || null, 
        size: input.size,
        width: input.width,
        height: input.height,
        created_at: input.created_at || new Date().toISOString(),  
        last_modified: input.last_modified || new Date().toISOString(), 
      },
    });
=    return media;
  }

  // READ 
  static async find(id: string) {
    return prisma.media.findUnique({
      where: {
        id,
      },
    });
  }

  // READ 
  static async findMany(ids: string[]) {
    if (!ids || ids.length === 0) {
      return prisma.media.findMany(); 
    }

    return prisma.media.findMany({
      where: {
        id: {
          in: ids, 
        },
      },
    });
  }

  // UPDATE
  static async update(id: string, input: Partial<MediaInput>) {
    try {
      const media = await prisma.media.update({
        where: {
          id,
        },
        data: {
          cloudinary_id: input.cloudinary_id || undefined,
          name: input.name || undefined,
          type: input.type || undefined,
          format: input.format || undefined,
          src: input.src || undefined,
          alt: input.alt || null,  // If `alt` is not provided, set it to null
          size: input.size || undefined,
          width: input.width || undefined,
          height: input.height || undefined,
          last_modified: new Date().toISOString(), // Automatically set `last_modified` to current time
        },
      });
      return media;
    } catch (e) {
      return null; // If update fails, return null
    }
  }

  // DELETE
  static async delete(id: string) {
    try {
      await prisma.media.delete({
        where: {
          id,
        },
      });
      return true; 
    } catch (e) {
      return false; 
    }
  }
}
