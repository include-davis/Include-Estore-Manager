import prisma from '@datalib/_prisma/client';
import { HttpError, NotFoundError } from '@utils/response/Errors';
import { v2 as cloudinary } from 'cloudinary';
import schema from '@app/_utils/schema';
import { FieldType, Field } from '@dist/index';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteMediaItem(
  id: string
): Promise<{ ok: boolean; body: string | null; error: string | null }> {
  try {
    // Find the media item in the database
    const mediaItem = await prisma.media.findUnique({
      where: { id },
    });

    if (!mediaItem) {
      throw new NotFoundError(`Media item with id: ${id} not found.`);
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(mediaItem.cloudinaryId, {
      resource_type: mediaItem.format === 'pdf' ? 'image' : mediaItem.type,
    });

    // Delete from Prisma database
    await prisma.media.delete({
      where: { id },
    });

    const contentTypes = schema.getNames();

    await Promise.all(
      contentTypes.map(async (contentType: string) => {
        const contentSchema = schema.get(contentType);
        if (!contentSchema) {
          throw new NotFoundError(
            `Content type: ${contentType} does not exist.`
          );
        }

        const mediaFields = contentSchema
          .getFieldArray()
          .filter((field: Field) => field.type === FieldType.MEDIA_LIST)
          .map((field: Field) => field.name);

        if (mediaFields.length === 0) {
          return null;
        }

        // Update all records to remove references to the deleted media item
        await prisma[contentType as keyof typeof prisma].updateMany({
          where: {
            OR: mediaFields.map((field: string) => ({
              [field]: { has: id }, // Assuming media fields are stored as arrays
            })),
          },
          data: mediaFields.reduce(
            (acc: Record<string, { set: string[] }>, field: string) => ({
              ...acc,
              [field]: { set: [] },
            }), // Remove media item from lists
            {}
          ),
        });
      })
    );

    return {
      ok: true,
      body: 'Media item deleted.',
      error: null,
    };
  } catch (error) {
    const e = error as HttpError;
    return {
      ok: false,
      body: null,
      error: e.message || 'Internal Server Error',
    };
  }
}
