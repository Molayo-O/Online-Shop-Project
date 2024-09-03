//establish connection to database
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectDb() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("online-shop");
}

function getDb() {
  //determine if no database connection
  if (!database) {
    throw new Error("You must establish connection to db before access");
  }

  return database;
}

module.exports = {
  connectDb: connectDb,
  getDb: getDb,
};
