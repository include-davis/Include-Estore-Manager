import gql from 'graphql-tag';

const typeDefs = gql`
  enum OrderStatus {
    PENDING
    ORDERED
    SHIPPED
    IN_TRANSIT
    DELIVERED
  }

  enum CancellationStatus {
    CANCELLED
    REFUNDED
  }

  type Order {
    id: ID!
    paymentIntentId: String
    total: Float!
    products: [OrderProduct]
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
    status: OrderStatus!
    cancellation_status: CancellationStatus
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
    status: OrderStatus
    cancellation_status: CancellationStatus
  }

  input OrderUpdateInput {
    total: Float
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
    status: OrderStatus
    cancellation_status: CancellationStatus
  }

  input OrderProductInput {
    product_id: ID!
    quantity: Int!
  }

  type OrderProduct {
    product: Product!
    quantity: Int!
  }

  type ProcessOrderResult {
    order: Order!
    clientSecret: String!
  }

  type Query {
    order(id: ID!): Order
    orders(
      statuses: [OrderStatus]
      cancellation_statuses: [CancellationStatus]
      search: String
      offset: Int!
      limit: Int!
    ): [Order]
  }

  type Mutation {
    createOrder(input: OrderInput!): Order
    updateOrder(id: ID!, input: OrderUpdateInput!): Order
    deleteOrder(id: ID!): Boolean
    addProductToOrder(id: ID!, productToAdd: OrderProductInput!): Order
    removeProductFromOrder(id: ID!, product_id: ID!): Order
    editProductQuantity(id: ID!, productToUpdate: OrderProductInput!): Order
    processOrder(
      input: OrderInput!
      products: [OrderProductInput!]!
    ): ProcessOrderResult
  }
`;

export default typeDefs;
