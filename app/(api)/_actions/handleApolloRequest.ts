'use server';

import handler from '@datalib/apolloServer';

export default async function handleApolloRequest(
  request: string,
  variables: object
) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + process.env.API_KEY,
  };

  // We use a dummy URL since we're not actually querying a real endpoint
  const req = new Request('http://a', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query: request,
      variables,
    }),
  });

  const res = await handler(req);

  return res.json();
}
