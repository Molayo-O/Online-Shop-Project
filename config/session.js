//session configurations
import expressSession from "express-session";

//create session storage
import mongoDbStore from "connect-mongodb-session";

export function createSessionStorage() {
  const MongoDbStore = mongoDbStore(expressSession);

  const sessionStorage = new MongoDbStore({
    uri: "mongodb://localhost:27017",
    databaseName: "online-shop",
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
      maxAge: 24 * 60 * 1000,
    },
  };
}
