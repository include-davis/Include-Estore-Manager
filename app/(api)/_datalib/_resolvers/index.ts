import { mergeResolvers } from '@graphql-tools/merge';
import type { IResolvers } from '@graphql-tools/utils';

import Product from './Product';
import User from './User';
import Inventory from './Inventory';
import Tag from './Tag';
import Order from './Order';
import Hello from './HealthCheck';

const allResolvers: IResolvers[] = [];

const modules = [Product, User, Inventory, Tag, Order, Hello];
modules.forEach((module) => {
  allResolvers.push(module);
});

const resolvers = mergeResolvers(allResolvers);

export default resolvers;
