import Products from '../_services/Products';
import { ProductInput } from '@datatypes/Product';

const resolvers = {
  Query: {
    product: (_: never, args: { id: string }) => Products.find(args.id),
    products: (_: never, args: { ids: [string] }) => Products.findAll(args.ids),
  },
  Mutation: {
    createProduct: (_: never, args: { input: ProductInput }) =>
      Products.create(args.input),
    updateProduct: (_: never, args: { id: string; input: ProductInput }) =>
      Products.update(args.id, args.input),
    deleteProduct: (_: never, args: { id: string }) => Products.delete(args.id),
  },
};

export default resolvers;
