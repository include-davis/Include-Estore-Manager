import Users from '../_services/Users';
import { UserInput } from '@datatypes/User';
import { ApolloContext } from '@datalib/apolloServer';

const resolvers = {
  Query: {
    user: (_: never, args: { id: string }) => Users.find(args.id),
    users: (_: never, args: { ids: string[] }) => Users.findMany(args.ids),
  },
  Mutation: {
    createUser: (_: never, args: { input: UserInput }, ctx: ApolloContext) =>
      Users.create(args.input, ctx),
    updateUser: (
      _: never,
      args: { id: string; input: UserInput },
      ctx: ApolloContext
    ) => Users.update(args.id, args.input, ctx),
    deleteUser: (_: never, args: { id: string }, ctx: ApolloContext) =>
      Users.delete(args.id, ctx),
  },
};

export default resolvers;
