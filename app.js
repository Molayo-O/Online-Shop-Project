import path from "path";
import express from "express";
import expressSession from "express-session";
import { fileURLToPath } from "url";

//import db
import { connectDb } from "./database/connectdb.js";
import { checkAuthStatus } from "./middlewares/authStatus.js";
import { handleErrors } from "./middlewares/error-handling.js";
import authRoutes from "./routes/auth-route.js";
import productRoutes from "./routes/products-route.js";
import baseRoutes from "./routes/base-route.js";
import { createSessionConfig } from "./config/session.js";
const app = express();

app.set("view engine", "ejs");
// Path to views folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));

//serve public files statically
app.use(express.static("public"));

//allow data to be parsed during requests
app.use(express.urlencoded({ extended: false }));

//use express session
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

//use auth check middleware
app.use(checkAuthStatus);

//Check for every incoming request
app.use(authRoutes);
app.use(baseRoutes);
app.use(productRoutes);

//use error handler middleware
app.use(handleErrors);

//server should only listen when a database connection is established
connectDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database");
    console.log(error);
  });
