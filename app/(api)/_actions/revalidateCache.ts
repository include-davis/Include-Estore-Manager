'use server';

import { revalidatePath } from 'next/cache';
import revalidationPaths, { RevalidationKey } from '@cache/revalidationPaths';

export default async function revalidateCache(keys: RevalidationKey[]) {
  for (const key of keys) {
    for (const path of revalidationPaths[key]) {
      revalidatePath(path);
    }
  }
}
