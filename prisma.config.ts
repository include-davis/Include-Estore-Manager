import path from 'node:path';
import type { PrismaConfig } from 'prisma';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  earlyAccess: true,
  schema: path.join('prisma'),
} satisfies PrismaConfig;
