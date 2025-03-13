import prisma from '@datalib/_prisma/client';
import { HttpError, NotFoundError } from '@utils/response/Errors';

type Media = Awaited<ReturnType<typeof prisma.media.findUnique>>;

export async function findMediaItem(
  id: string
): Promise<{ ok: boolean; body: Media | null; error: string | null }> {
  try {
    const mediaItem = await prisma.media.findUnique({
      where: { id },
    });

    if (!mediaItem) {
      throw new NotFoundError(`Media item with id: ${id} not found.`);
    }

    return { ok: true, body: mediaItem, error: null };
  } catch (error) {
    const e = error as HttpError;
    return {
      ok: false,
      body: null,
      error: e.message || 'Internal Server Error',
    };
  }
}

export async function findMediaItems(
  query: Record<string, Media> = {}
): Promise<{ ok: boolean; body: Media[] | null; error: string | null }> {
  try {
    const mediaItems = await prisma.media.findMany({
      where: query,
    });

    return { ok: true, body: mediaItems, error: null };
  } catch (error) {
    const e = error as HttpError;
    return {
      ok: false,
      body: null,
      error: e.message || 'Internal Server Error',
    };
  }
}
