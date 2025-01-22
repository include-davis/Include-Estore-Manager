export type RevalidationKey =
  | 'users'
  | 'products'
  | 'inventories'
  | 'orders'
  | 'tags';

const revalidationPaths = {
  users: ['/users'],
  products: ['/products'],
  inventories: ['/inventories'],
  orders: ['/orders'],
  tags: ['/products'],
};

export default revalidationPaths;
