import AuthAPI from "./datasources/auth";
import UserAPI from "./datasources/user";
import ReviewAPI from "./datasources/review";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers/resolvers";

const typeDefs = importSchema("schema.graphql");
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      authAPI: new AuthAPI(),
      userAPI: new UserAPI(),
      reviewAPI: new ReviewAPI(),
    };
  },
  context: ({ req }) => ({
    token: req.headers.authorization,
  }),
});
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
