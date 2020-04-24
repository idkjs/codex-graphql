import { AuthenticationError } from "apollo-server";
import { getUser } from "../connectors/user";
import { login, signup } from "../connectors/auth";

export const resolvers = {
  Query: {
    user: (root, args, context) => {
      return getUser(context.authToken);
    },
  },
  Mutation: {
    login: async (_, { input }, __) => {
      // Here could be email validation etc.
      if (!input.username || !input.password) {
        throw new AuthenticationError("Please provide correct credentials");
      }
      try {
        const token = await login(input);
        return {
          token,
        };
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
    signup: (_, { input }, __) => {
      return {
        token: signup(input),
      };
    },
  },
};
