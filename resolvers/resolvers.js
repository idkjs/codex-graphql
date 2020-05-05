import { AuthenticationError, UserInputError } from "apollo-server";

export const resolvers = {
  Query: {
    user: (root, args, { dataSources }) => {
      return dataSources.userAPI.user();
    },
    reviews: (_, __, { dataSources }) => {
      return dataSources.reviewAPI.getReviews();
    },
    review: (_, { id }, { dataSources }) => {
      return dataSources.reviewAPI.getReview(id);
    },
  },
  Mutation: {
    login: async (_, { input }, { dataSources }) => {
      // Here could be email validation etc.

      if (!input.username && !input.password) {
        throw new UserInputError("Please provide username", {
          invalidArgs: ["Username", "Password"],
        });
      }

      if (!input.username) {
        throw new UserInputError("Please provide username", {
          invalidArgs: "Username",
        });
      }

      if (!input.password) {
        throw new UserInputError("Please provide password", {
          invalidArgs: "Password",
        });
      }

      try {
        const loginResponse = await dataSources.authAPI.login(input);
        return {
          token: loginResponse,
        };
      } catch (error) {
        throw new AuthenticationError("Invalid Credentials");
      }
    },
    signup: async (_, { input }, { dataSources }) => {
      if (!input.username || !input.password) {
        throw new AuthenticationError("Please provide username / password");
      }
      try {
        return {
          token: dataSources.authAPI.signup(input),
        };
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
    addReview: async (_, { input }, { dataSources }) => {
      try {
        return dataSources.reviewAPI.addReview(input);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
