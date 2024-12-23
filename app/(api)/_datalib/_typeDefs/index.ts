import { mergeTypeDefs } from '@graphql-tools/merge';
import type { DocumentNode } from 'graphql';

import Product from './Product';

const allTypeDefs: DocumentNode[] = [];

const modules = [Product];
modules.forEach((module) => {
  allTypeDefs.push(module);
});

const typeDefs = mergeTypeDefs(allTypeDefs);

export default typeDefs;
