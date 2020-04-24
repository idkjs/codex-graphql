import { getUser } from "../connectors/user";
import { login, signup } from "../connectors/auth";

export const resolvers = {
  Query: {
    user: (root, args, context) => {
      return getUser();
    },
  },
  Mutation: {
    login: (_, { input }, __) => {
      return {
        token: login(input),
      };
    },
    signup: (_, { input }, __) => {
      return {
        token: signup(input),
      };
    },
  },
};
