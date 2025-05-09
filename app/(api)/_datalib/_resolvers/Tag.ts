import Tags from '../_services/Tags';
import { Tag, TagInput } from '@datatypes/Tag';
import { ApolloContext } from '@datalib/apolloServer';

const resolvers = {
  Tag: {
    products: (parent: Tag) => Tags.findProducts(parent.id),
  },
  Query: {
    tag: (_: never, args: { name: string }) => Tags.find(args.name),
    tags: (_: never, args: { names: string[] }) => Tags.findMany(args.names),
  },
  Mutation: {
    createTag: (_: never, args: { input: TagInput }, ctx: ApolloContext) =>
      Tags.create(args.input, ctx),
    deleteTag: (_: never, args: { name: string }, ctx: ApolloContext) =>
      Tags.delete(args.name, ctx),
  },
};

export default resolvers;
