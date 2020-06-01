import AuthAPI from "./datasources/auth";
import UserAPI from "./datasources/user";
import ReviewAPI from "./datasources/review";
import cloudinary from "cloudinary";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers/resolvers";

const typeDefs = importSchema("schema.graphql");
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Some sandbox keys, don't mind posting them.
cloudinary.v2.config({
  cloud_name: "dba0ywaq9",
  api_key: "112284523984387",
  api_secret: "YaM7e0sHB2ST_th9S41oCPikPKA",
});

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
