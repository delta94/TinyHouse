import { MongoClient } from "mongodb";
import { Database } from "../lib/types";
import { Configuration } from '../config';

const { DB_CLUSTER, DB_PASSWORD, DB_USER } = Configuration;

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;
console.log(url);
export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});

  const db = client.db("main");

  return {
    listings: db.collection("test_listings")
  };
};
