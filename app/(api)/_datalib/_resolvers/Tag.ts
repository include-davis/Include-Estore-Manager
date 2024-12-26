import Tags from '../_services/Tags';
import { Tag, TagInput } from '@datatypes/Tag';

const resolvers = {
  Tag: {
    products: (parent: Tag) => Tags.findProducts(parent.id),
  },
  Query: {
    tag: (_: never, args: { name: string }) => Tags.find(args.name),
    tags: (_: never, args: { names: string[] }) => Tags.findMany(args.names),
  },
  Mutation: {
    createTag: (_: never, args: { input: TagInput }) => Tags.create(args.input),
    deleteTag: (_: never, args: { name: string }) => Tags.delete(args.name),
  },
};

export default resolvers;
