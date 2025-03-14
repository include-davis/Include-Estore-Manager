import Products from '../_services/Products';
import Inventories from '@datalib/_services/Inventories';
import {
  Product,
  ProductInput,
  ProductInventoryInput,
} from '@datatypes/Product';
import { ApolloContext } from '@datalib/apolloServer';

const resolvers = {
  Product: {
    inventory: (parent: Product) => Inventories.find(parent.id), // product and inventory have the same id
    tags: (parent: Product) => Products.getTags(parent.id),
  },
  Query: {
    product: (_: never, args: { id: string }) => Products.find(args.id),
    products: (_: never, args: { ids: string[] }) =>
      Products.findMany(args.ids),
  },
  Mutation: {
    createProduct: (
      _: never,
      args: { input: ProductInventoryInput },
      ctx: ApolloContext
    ) => Products.create(args.input, ctx),
    updateProduct: (
      _: never,
      args: { id: string; input: ProductInput },
      ctx: ApolloContext
    ) => Products.update(args.id, args.input, ctx),
    deleteProduct: (_: never, args: { id: string }, ctx: ApolloContext) =>
      Products.delete(args.id, ctx),
    addTags: (
      _: never,
      args: { id: string; tagNames: string[] },
      ctx: ApolloContext
    ) => Products.addTags(args.id, args.tagNames, ctx),
    removeTags: (
      _: never,
      args: { id: string; tagNames: string[] },
      ctx: ApolloContext
    ) => Products.removeTags(args.id, args.tagNames, ctx),
  },
};

export default resolvers;
