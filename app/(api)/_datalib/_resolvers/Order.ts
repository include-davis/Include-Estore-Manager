import Orders from '../_services/Orders';
import { OrderInput, Order, OrderProductInput } from '@datatypes/Order';
import { ApolloContext } from '../apolloServer';

const resolvers = {
  Order: {
    products: (parent: Order, _: never, ctx: ApolloContext) =>
      Orders.getProducts(parent.id, ctx),
  },
  Query: {
    order: (_: never, args: { id: string }, ctx: ApolloContext) =>
      Orders.find(args.id, ctx),
    orders: (_: never, args: { ids: string[] }, ctx: ApolloContext) =>
      Orders.findMany(args.ids, ctx),
  },
  Mutation: {
    updateOrder: (
      _: never,
      args: { id: string; input: OrderInput },
      ctx: ApolloContext
    ) => Orders.update(args.id, args.input, ctx),
    deleteOrder: (_: never, args: { id: string }, ctx: ApolloContext) =>
      Orders.delete(args.id, ctx),
    createOrder: (_: never, args: { input: OrderInput }, ctx: ApolloContext) =>
      Orders.create(args.input, ctx),
    addProductToOrder: (
      _: never,
      args: { id: string; productToAdd: OrderProductInput },
      ctx: ApolloContext
    ) => Orders.addProductToOrder(args.id, args.productToAdd, ctx),
    removeProductFromOrder: (
      _: never,
      args: { id: string; product_id: string },
      ctx: ApolloContext
    ) => Orders.removeProductFromOrder(args.id, args.product_id, ctx),
    editProductQuantity: (
      _: never,
      args: {
        id: string;
        productToUpdate: OrderProductInput;
      },
      ctx: ApolloContext
    ) => Orders.editProductQuantity(args.id, args.productToUpdate, ctx),
  },
};

export default resolvers;
