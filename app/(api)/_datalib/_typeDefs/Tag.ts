import gql from 'graphql-tag';

const typeDefs = gql`
  type Tag {
    id: ID!
    name: String!
    products: [Product]
  }

  input TagInput {
    name: String!
  }

  type Query {
    tag(name: String!): Tag
    tags(names: [String]): [Tag]
  }

  type Mutation {
    createTag(input: TagInput!): Tag
    deleteTag(name: String!): Boolean
  }
`;

export default typeDefs;
