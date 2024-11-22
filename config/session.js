import dotenv from 'dotenv';
dotenv.config();
//session configurations
import expressSession from "express-session";

//create session storage
import mongoDbStore from "connect-mongodb-session";


export function createSessionStorage() {
  const MongoDbStore = mongoDbStore(expressSession);

  const sessionStorage = new MongoDbStore({
    uri: process.env.MONGODB_URL,
    databaseName: "Online-Shop-Project",
    collection: "sessions",
  });

  return sessionStorage;
}

export function createSessionConfig() {
  return {
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: createSessionStorage(),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  };
}
