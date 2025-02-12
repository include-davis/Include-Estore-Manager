import Orders from '../_services/Orders';
import { OrderInput } from '@datatypes/Order';

const resolvers = {
  Mutation: {
    updateOrder: (_: never, args: { id: string; input: OrderInput }) =>
      Orders.update(args.id, args.input),
    deleteOrder: (_: never, args: { id: string }) => Orders.delete(args.id),
  },
};

export default resolvers;
