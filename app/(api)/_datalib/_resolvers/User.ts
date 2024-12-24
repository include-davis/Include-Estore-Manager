import Users from '../_services/Users';
import { UserInput } from '@datatypes/User';

const resolvers = {
  Query: {
    user: (_: never, args: { id: string }) => Users.find(args.id),
    users: (_: never, args: { ids: string[] }) => Users.findMany(args.ids),
  },
  Mutation: {
    createUser: (_: never, args: { input: UserInput }) =>
      Users.create(args.input),
    updateUser: (_: never, args: { id: string; input: UserInput }) =>
      Users.update(args.id, args.input),
    deleteUser: (_: never, args: { id: string }) => Users.delete(args.id),
  },
};

export default resolvers;
