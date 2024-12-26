import gql from 'graphql-tag';

const typeDefs = gql`
  type Inventory {
    id: ID!
    product: Product!
    available_quantity: Int!
    cost_of_production: Float!
    lead_time: Int!
    reorder_point: Int!
    reorder_quantity: Int!
    safety_stock: Int!
    stock_on_order: Int!
  }

  input UpdateInventoryInput {
    available_quantity: Int
    cost_of_production: Float
    lead_time: Int
    reorder_point: Int
    reorder_quantity: Int
    safety_stock: Int
    stock_on_order: Int
  }

  type Query {
    inventory(id: ID!): Inventory
    inventories(ids: [ID]): [Inventory]
  }

  type Mutation {
    updateInventory(id: ID!, input: UpdateInventoryInput!): Inventory
  }
`;

export default typeDefs;
