import { gql } from 'graphql-tag';

export const usersQuery = gql`
  query Users($ids: [ID]) {
    users(ids: $ids) {
      id
      name
    }
  }
`;
