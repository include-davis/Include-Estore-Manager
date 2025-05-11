import { ApolloContext } from '@datalib/apolloServer';
import HealthChecks from '@datalib/_services/HealthChecks';

const resolvers = {
  Query: {
    getAuthenticationStatus: (_: never, _2: never, ctx: ApolloContext) =>
      HealthChecks.getAuthenticationStatus(ctx),
  },
};

export default resolvers;
