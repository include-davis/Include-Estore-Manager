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
    inventory: (parent: Product, _: never, ctx: ApolloContext) =>
      Inventories.find(parent.id, ctx), // product and inventory have the same id
    tags: (parent: Product, _: never, ctx: ApolloContext) =>
      Products.getTags(parent.id, ctx),
    orders: (parent: Product, _: never, ctx: ApolloContext) =>
      Products.getOrders(parent.id, ctx),
  },
  Query: {
    product: (_: never, args: { id: string }, ctx: ApolloContext) =>
      Products.find(args.id, ctx),
    products: (_: never, args: { ids: string[] }, ctx: ApolloContext) =>
      Products.findMany(args.ids, ctx),
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
