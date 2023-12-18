import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  return server.createHandler({ path: "/" });
};

export default startServer();
