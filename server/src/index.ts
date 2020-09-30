require("dotenv").config({ path: __dirname + "/.env" });

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";
import {
  Google
} from './lib/api';
const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db })
  });
  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);

  console.log(`[app]: https://localhost:${process.env.PORT}`);
  console.log(Google)
  const listings = await db.listings.find({}).toArray();
  // console.log('a',db.listings.find({}).toArray());
};

mount(express());
