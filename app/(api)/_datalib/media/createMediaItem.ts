import prisma from '@datalib/_prisma/client';
import parseAndReplace from '@utils/request/parseAndReplace';
import { HttpError, NoContentError } from '@utils/response/Errors';
import isBodyEmpty from '@utils/request/isBodyEmpty';

export async function createMediaItem(body: object) {
  try {
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }

    const parsedBody = await parseAndReplace(body);
    const currentDate = new Date().toISOString();

    // Insert new media item using Prisma
    const createdMedia = await prisma.media.create({
      data: {
        ...parsedBody,
        lastModified: currentDate,
        createdAt: currentDate,
      },
    });

    if (!createdMedia) {
      throw new HttpError('Failed to fetch the created item');
    }

    return { ok: true, body: createdMedia, error: null };
  } catch (e) {
    const error = e as HttpError;
    return {
      ok: false,
      body: null,
      error: error.message || 'Internal Server Error',
    };
  }
}
