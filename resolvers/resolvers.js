import { AuthenticationError } from "apollo-server";

export const resolvers = {
  Query: {
    user: (root, args, { dataSources }) => {
      return dataSources.userAPI.user();
    },
  },
  Mutation: {
    login: async (_, { input }, { dataSources }) => {
      // Here could be email validation etc.
      if (!input.username || !input.password) {
        throw new AuthenticationError("Please provide username / password");
      }
      try {
        return {
          token: dataSources.authAPI.login(input)
        };
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
    signup: async (_, { input }, { dataSources }) => {
      if (!input.username || !input.password) {
        throw new AuthenticationError("Please provide username / password");
      }
      try {
        return {
          token: dataSources.authAPI.signup(input)
        };
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
  },
};
