import prisma from '@datalib/_prisma/client';
// import { parseAndReplace } from '@utils/request/parseAndReplace';
import parseAndReplace from '@utils/request/parseAndReplace';
import { HttpError, NoContentError } from '@utils/response/Errors';

export async function updateMediaItem(
  id: string,
  body = {}
): Promise<{ ok: boolean; body: object | null; error: string | null }> {
  try {
    if (!body || Object.keys(body).length === 0) {
      throw new NoContentError();
    }

    const updates = await parseAndReplace(body);
    updates._last_modified = new Date().toISOString();

    const updateStatus = await prisma.media.update({
      where: { id },
      data: updates,
    });

    return { ok: true, body: updateStatus, error: null };
  } catch (error) {
    const e = error as HttpError;
    return {
      ok: false,
      body: null,
      error: e.message || 'Internal Server Error',
    };
  }
}
