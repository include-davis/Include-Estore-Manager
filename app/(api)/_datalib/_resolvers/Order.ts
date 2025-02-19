import Orders from '../_services/Orders';
import { OrderInput } from '@datatypes/Order';

const resolvers = {
  Query: {
    order: (_: never, args: { id: string }) => Orders.find(args.id),
    orders: (_: never, args: { ids: string[] }) => Orders.findMany(args.ids),
  },
  Mutation: {
    updateOrder: (_: never, args: { id: string; input: OrderInput }) =>
      Orders.update(args.id, args.input),
    deleteOrder: (_: never, args: { id: string }) => Orders.delete(args.id),
    createOrder: (_: never, args: { input: OrderInput }) =>
      Orders.create(args.input),
  },
};

export default resolvers;
