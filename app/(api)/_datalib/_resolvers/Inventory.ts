import { Inventory, InventoryInput } from '@datatypes/Inventory';
import Inventories from '../_services/Inventories';
import Products from '../_services/Products';
import { ApolloContext } from '@datalib/apolloServer';

const resolvers = {
  Inventory: {
    product: (parent: Inventory, _: never, ctx: ApolloContext) =>
      Products.find(parent.id, ctx), // product and inventory have the same id
  },
  Query: {
    inventory: (_: never, args: { id: string }, ctx: ApolloContext) =>
      Inventories.find(args.id, ctx),
    inventories: (_: never, args: { ids: string[] }, ctx: ApolloContext) =>
      Inventories.findMany(args.ids, ctx),
  },
  Mutation: {
    updateInventory: (
      _: never,
      args: { id: string; input: InventoryInput },
      ctx: ApolloContext
    ) => Inventories.update(args.id, args.input, ctx),
  },
};

export default resolvers;
