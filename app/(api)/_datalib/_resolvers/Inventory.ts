import { Inventory, InventoryInput } from '@datatypes/Inventory';
import Inventories from '../_services/Inventories';
import Products from '../_services/Products';

const resolvers = {
  Inventory: {
    product: (parent: Inventory) => Products.find(parent.id), // product and inventory have the same id
  },
  Query: {
    inventory: (_: never, args: { id: string }) => Inventories.find(args.id),
    inventories: (_: never, args: { ids: string[] }) =>
      Inventories.findMany(args.ids),
  },
  Mutation: {
    updateInventory: (_: never, args: { id: string; input: InventoryInput }) =>
      Inventories.update(args.id, args.input),
  },
};

export default resolvers;
