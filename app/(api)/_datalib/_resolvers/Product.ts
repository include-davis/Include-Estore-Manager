import Products from '../_services/Products';
import Inventories from '@datalib/_services/Inventories';
import {
  Product,
  ProductInput,
  ProductInventoryInput,
} from '@datatypes/Product';

const resolvers = {
  Product: {
    inventory: (parent: Product) => Inventories.find(parent.id), // product and inventory have the same id
    tags: (parent: Product) => Products.getTags(parent.id),
    orders: (parent: Product) => Products.getOrders(parent.id),
  },
  Query: {
    product: (_: never, args: { id: string }) => Products.find(args.id),
    products: (_: never, args: { ids: string[] }) =>
      Products.findMany(args.ids),
  },
  Mutation: {
    createProduct: (_: never, args: { input: ProductInventoryInput }) =>
      Products.create(args.input),
    updateProduct: (_: never, args: { id: string; input: ProductInput }) =>
      Products.update(args.id, args.input),
    deleteProduct: (_: never, args: { id: string }) => Products.delete(args.id),
    addTags: (_: never, args: { id: string; tagNames: string[] }) =>
      Products.addTags(args.id, args.tagNames),
    removeTags: (_: never, args: { id: string; tagNames: string[] }) =>
      Products.removeTags(args.id, args.tagNames),
  },
};

export default resolvers;
