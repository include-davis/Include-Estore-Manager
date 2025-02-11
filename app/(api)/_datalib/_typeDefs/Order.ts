import gql from 'graphql-tag';

const typeDefs = gql`
  type Order {
    id: ID!
    products: [OrderProduct!]
    customer_name: String!
    customer_email: String!
    customer_phone_num: String!
    billing_address_line_1: String!
    billing_address_line_2: String
    billing_city: String!
    billing_zip: String!
    billing_country: String!
    shipping_address_line_1: String!
    shipping_address_line_2: String
    shipping_city: String!
    shipping_zip: String!
    shipping_country: String!
    status: String!
    created_at: String!
  }

  input OrderInput {
    customer_name: String!
    customer_email: String!
    customer_phone_num: String!
    billing_address_line_1: String!
    billing_address_line_2: String
    billing_city: String!
    billing_zip: String!
    billing_country: String!
    shipping_address_line_1: String!
    shipping_address_line_2: String
    shipping_city: String!
    shipping_zip: String!
    shipping_country: String!
  }

  input OrderUpdateInput {
    customer_name: String
    customer_email: String
    customer_phone_num: String
    billing_address_line_1: String
    billing_address_line_2: String
    billing_city: String
    billing_zip: String
    billing_country: String
    shipping_address_line_1: String
    shipping_address_line_2: String
    shipping_city: String
    shipping_zip: String
    shipping_country: String
  }

  type OrderProduct {
    product: Product!
    quantity: Int!
  }

  type Query {
    order(id: ID!): Order
    orders(id: [ID]): [Order]
  }

  type Mutation {
    createOrder(input: OrderInput!): Order
    updateOrder(id: ID!, input: OrderUpdateInput!): Order
    deleteOrder(id: ID!): Boolean
    addProduct(orderId: ID!, productId: ID!): Order
    removeProduct(orderId: ID!, productId: ID!): Order
    editProductQuantity(orderId: ID!, productId: ID!): Order
  }
`;

export default typeDefs;
