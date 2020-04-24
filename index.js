import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers/resolvers";

const typeDefs = importSchema("schema.graphql");
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
