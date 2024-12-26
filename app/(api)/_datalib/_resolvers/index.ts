import { mergeResolvers } from '@graphql-tools/merge';
import type { IResolvers } from '@graphql-tools/utils';

import Product from './Product';
import User from './User';
import Inventory from './Inventory';
import Tag from './Tag';

const allResolvers: IResolvers[] = [];

const modules = [Product, User, Inventory, Tag];
modules.forEach((module) => {
  allResolvers.push(module);
});

const resolvers = mergeResolvers(allResolvers);

export default resolvers;
