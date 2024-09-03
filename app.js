const path = require("path");

const express = require("express");

//import db
const db = require("./database/connectdb");
const errorHandler = require('./middlewares/error-handling');
const authRoutes = require("./routes/auth-route");
const app = express();

app.set("view engine", "ejs");
//Path to views folder
app.set("views", path.join(__dirname, "views"));

//serve public files statically
app.use(express.static("public"));

//allow data to be parsed during requests
app.use(express.urlencoded({ extended: false }));

//Check for every incoming request
app.use(authRoutes);

//use error handler middleware
app.use(errorHandler);

//server should only listen when a database connection is established
db.connectDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database");
    console.log(error);
  });
