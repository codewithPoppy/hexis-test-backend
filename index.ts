import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const server = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/" });
