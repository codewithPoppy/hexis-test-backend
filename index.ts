import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import Cors from "micro-cors";

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  origin: "*",
});

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const handler = server.createHandler({ path: "/" });
  return cors((req, res) => {
    if (req.method === "OPTIONS") {
      res.end();
      return;
    }
    return handler(req, res);
  });
};

export default startServer();
