import { MongoClient } from "mongodb";

let client;

export async function connectDatabase() {
  if (client) return client;

  client = await MongoClient.connect(process.env.MONGODB_URI);
  return client;
}