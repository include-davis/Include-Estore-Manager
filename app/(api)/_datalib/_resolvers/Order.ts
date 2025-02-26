import Orders from '../_services/Orders';
import { OrderInput, Order, OrderProductInput } from '@datatypes/Order';

const resolvers = {
  Order: {
    products: (parent: Order) => Orders.getProducts(parent.id),
  },
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
    addProductToOrder: (
      _: never,
      args: { id: string; productToAdd: OrderProductInput }
    ) => Orders.addProductToOrder(args.id, args.productToAdd),
    removeProductFromOrder: (
      _: never,
      args: { id: string; productToRemove: OrderProductInput }
    ) => Orders.removeProductFromOrder(args.id, args.productToRemove),
    editProductQuantity: (
      _: never,
      args: {
        id: string;
        productToUpdate: OrderProductInput;
      }
    ) => Orders.editProductQuantity(args.id, args.productToUpdate),
  },
};

export default resolvers;
