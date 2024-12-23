import { gql } from 'graphql-tag';

export const updateUserMutation = gql`
  mutation UpdateUser($updateUserId: ID!, $input: UserInput!) {
    updateUser(id: $updateUserId, input: $input) {
      id
      name
    }
  }
`;
