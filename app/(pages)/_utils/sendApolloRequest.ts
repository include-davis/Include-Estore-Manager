import { DocumentNode, print } from 'graphql';

import handleApolloRequest from '@actions/handleApolloRequest';

export default async function sendApolloRequest(params: {
  request: DocumentNode;
  variables?: object;
}) {
  return handleApolloRequest(print(params.request), params.variables ?? {});
}
