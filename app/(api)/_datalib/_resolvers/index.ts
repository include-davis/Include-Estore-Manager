import { mergeResolvers } from '@graphql-tools/merge';
import type { IResolvers } from '@graphql-tools/utils';

import Product from './Product';

const allResolvers: IResolvers[] = [];

const modules = [Product];
modules.forEach((module) => {
  allResolvers.push(module);
});

const resolvers = mergeResolvers(allResolvers);

export default resolvers;
