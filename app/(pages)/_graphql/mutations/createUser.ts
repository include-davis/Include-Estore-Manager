import { gql } from 'graphql-tag';

export const createUserMutation = gql`
  mutation Mutation($input: UserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;
