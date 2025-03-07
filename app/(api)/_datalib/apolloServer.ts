import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import type { NextRequest } from 'next/server';

import typeDefs from './_typeDefs/index';
import resolvers from './_resolvers/index';
import { auth } from '@/auth';
import { Session } from 'next-auth';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
}) as ApolloServer<object>;

/**
 * Can add extra things here when necessary.
 */
interface ApolloContext {
  session: Session | null;
}

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (): Promise<ApolloContext> => {
    const session = await auth();
    return { session };
  },
});

export default handler;
