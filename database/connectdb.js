//establish connection to database
import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

let database;

export async function connectDb() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("online-shop");
}

export function getDb() {
  //determine if no database connection
  if (!database) {
    throw new Error("You must establish connection to db before access");
  }

  return database;
}
