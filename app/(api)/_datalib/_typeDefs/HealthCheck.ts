import gql from 'graphql-tag';

const typeDefs = gql`
  type HealthCheck {
    isOwner: Boolean!
    hasValidApiKey: Boolean!
  }

  type Query {
    getAuthenticationStatus: HealthCheck!
  }
`;

export default typeDefs;
