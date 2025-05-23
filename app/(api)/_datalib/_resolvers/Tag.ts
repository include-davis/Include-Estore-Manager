import Tags from '../_services/Tags';
import { Tag, TagInput } from '@datatypes/Tag';
import { ApolloContext } from '@datalib/apolloServer';

const resolvers = {
  Tag: {
    products: (parent: Tag, _: never, ctx: ApolloContext) =>
      Tags.findProducts(parent.id, ctx),
  },
  Query: {
    tag: (_: never, args: { name: string }, ctx: ApolloContext) =>
      Tags.find(args.name, ctx),
    tags: (_: never, args: { names: string[] }, ctx: ApolloContext) =>
      Tags.findMany(args.names, ctx),
  },
  Mutation: {
    createTag: (_: never, args: { input: TagInput }, ctx: ApolloContext) =>
      Tags.create(args.input, ctx),
    deleteTag: (_: never, args: { name: string }, ctx: ApolloContext) =>
      Tags.delete(args.name, ctx),
  },
};

export default resolvers;
