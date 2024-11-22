//establish connection to database
import mongodb from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const MongoClient = mongodb.MongoClient;


let database;

export async function connectDb() {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  database = client.db("Online-Shop-Project");
}

export function getDb() {
  //determine if no database connection
  if (!database) {
    throw new Error("You must establish connection to db before access");
  }

  return database;
}
