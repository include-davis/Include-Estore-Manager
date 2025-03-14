import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import typeDefs from './_typeDefs/index';
import resolvers from './_resolvers/index';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import prisma from '@datalib/_prisma/client';

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
}

const handler = startServerAndCreateNextHandler(server, {
  context: async (): Promise<ApolloContext> => {
    const session = await auth();

    const uid = session?.user?.id;
    const dbUser = await prisma.user.findUnique({ where: { id: uid } });

    const isOwner = uid != undefined && dbUser !== null;

    return {
      session,
      isOwner,
    };
  },
});

export default handler;
