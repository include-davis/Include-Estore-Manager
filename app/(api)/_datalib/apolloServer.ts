import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { Session } from 'next-auth';

import { auth } from '@/auth';
import prisma from '@datalib/_prisma/client';
import typeDefs from './_typeDefs/index';
import resolvers from './_resolvers/index';
import { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim());

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
});

/**
 * Can add extra things here when necessary.
 */
export interface ApolloContext {
  session: Session | null;
  isOwner: boolean;
  hasValidApiKey: boolean;
}

async function apiKeyIsValid(req: NextRequest) {
  const authHeader = req.headers.get('Authorization') || '';
  const apiKey = authHeader.replace('Bearer ', '');
  const origin = req.headers.get('Origin') || '';
  const referer = req.headers.get('Referer') || '';
  const isLocalDevelopment = process.env.NODE_ENV === 'development';

  const apiKeyMatches = apiKey === process.env.API_KEY;
  const hasValidOrigin =
    ALLOWED_ORIGINS.includes(origin) ||
    ALLOWED_ORIGINS.some((domain) => referer.startsWith(domain)); // I believe this can be spoofed. Good to use in combination with API key.

  // If an API key is provided, ensure it's valid and comes from an allowed origin
  return apiKeyMatches && (hasValidOrigin || isLocalDevelopment);
}

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest): Promise<ApolloContext> => {
    // If there's no valid API key, fallback to session auth
    /*
    TODO:
    There are different ways to do this. We can make it so that if the API key is invalid,
    instead of falling back to session auth we completely ignore this attempt to connect to the server at all
    (by throwing an error). This ensures that if anyone attempts to use an API key, session auth will not be used.
     */
    const hasValidApiKey = await apiKeyIsValid(req);
    let session: Session | null = null;
    let isOwner = false;

    try {
      session = await auth();
      const email = session?.user?.email;

      if (email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: email },
        });
        isOwner = dbUser !== null;
      }
    } catch (err) {
      // Some database error occurs here for some reason...
      console.error(err);
    }

    return {
      session,
      isOwner,
      hasValidApiKey,
    };
  },
});

export default handler;
