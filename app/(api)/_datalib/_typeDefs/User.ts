import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    shipping_address_line_1: String!
    shipping_address_line_2: String
    shipping_city: String!
    shipping_state: String
    shipping_country: String!
    shipping_zip: Int!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    shipping_address_line_1: String!
    shipping_address_line_2: String
    shipping_city: String!
    shipping_state: String
    shipping_country: String!
    shipping_zip: Int!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    shipping_address_line_1: String
    shipping_address_line_2: String
    shipping_city: String
    shipping_state: String
    shipping_country: String
    shipping_zip: Int
  }

  type Query {
    user(id: ID!): User
    users(ids: [ID!]): [User]
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean
  }
`;

export default typeDefs;
