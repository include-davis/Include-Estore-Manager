import { mergeTypeDefs } from '@graphql-tools/merge';
import type { DocumentNode } from 'graphql';

import Product from './Product';
import User from './User';
import Inventory from './Inventory';
import Tag from './Tag';
import Order from './Order';

const allTypeDefs: DocumentNode[] = [];

const modules = [Product, User, Inventory, Tag, Order];
modules.forEach((module) => {
  allTypeDefs.push(module);
});

const typeDefs = mergeTypeDefs(allTypeDefs);

export default typeDefs;
