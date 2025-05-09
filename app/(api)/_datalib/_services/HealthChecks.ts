import { ApolloContext } from '@datalib/apolloServer';

export default class HealthChecks {
  static async getAuthenticationStatus(context: ApolloContext) {
    return {
      isOwner: context.isOwner,
      hasValidApiKey: context.hasValidApiKey,
    };
  }
}
