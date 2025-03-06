import gql from 'graphql-tag';

const typeDefs = gql`
  type Product {
    id: ID!
    inventory: Inventory!
    tags: [Tag]
    orders: [Order]
    name: String!
    price: Float!
    description: String!
    details: String!
    weight: Int!
    height: Int!
    width: Int!
    depth: Int!
    special_label_needed: Boolean!
  }

  input ProductInput {
    name: String!
    price: Float!
    description: String!
    details: String!
    weight: Int!
    height: Int!
    width: Int!
    depth: Int!
    special_label_needed: Boolean!
  }

  input ProductUpdateInput {
    name: String
    price: Int
    description: String
    details: String
    weight: Int
    height: Int
    width: Int
    depth: Int
    special_label_needed: Boolean
  }

  input InventoryInput {
    available_quantity: Int!
    cost_of_production: Float!
    lead_time: Int!
    reorder_point: Int!
    reorder_quantity: Int!
    safety_stock: Int!
    stock_on_order: Int!
  }

  input ProductInventoryInput {
    productInput: ProductInput!
    inventoryInput: InventoryInput!
  }

  type Query {
    product(id: ID!): Product
    products(id: [ID]): [Product]
  }

  type Mutation {
    createProduct(input: ProductInventoryInput!): Product
    updateProduct(id: ID!, input: ProductUpdateInput!): Product
    deleteProduct(id: ID!): Boolean
    addTags(id: ID!, tagNames: [String]): Product
    removeTags(id: ID!, tagNames: [String]): Product
  }
`;

export default typeDefs;
