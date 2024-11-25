import path from "path";
import express from "express";
import expressSession from "express-session";
import { fileURLToPath } from "url";

//import db
import { connectDb } from "./database/connectdb.js";
import { checkAuthStatus } from "./middlewares/authStatus.js";
import { handleErrors } from "./middlewares/error-handling.js";
import { handleProtectedRoutes } from "./middlewares/protectedRoutes.js";
import { initializeCart } from "./middlewares/sessionCart.js";
import { updateCartPrices } from "./middlewares/update-cart-prices.js";
import { notFoundHandler } from "./middlewares/not-found.js";
import authRoutes from "./routes/auth-route.js";
import productRoutes from "./routes/products-route.js";
import baseRoutes from "./routes/base-route.js";
import adminRoutes from "./routes/admin-routes.js";
import cartRoutes from "./routes/cart-routes.js";
import orderRoutes from "./routes/order-routes.js";
import { createSessionConfig } from "./config/session.js";
const app = express();

app.set("view engine", "ejs");
// Path to views folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));

//serve public files statically
app.use(express.static("public"));
//serve image folders statically using specific URL
app.use("/products/assets", express.static("product-data"));

//allow data to be parsed during requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use express session
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

//initialize cart
app.use(initializeCart);
app.use(updateCartPrices);

//use auth check middleware
app.use(checkAuthStatus);

//Check for every incoming request
app.use(authRoutes);

//route for test admin
app.get("/login/test-admin", (req, res) => {
  res.redirect("/login?testAdmin=true");
});

app.use(baseRoutes);
app.use("/cart", cartRoutes);
app.use(productRoutes);
app.use("/admin", handleProtectedRoutes, adminRoutes);
app.use("/orders", handleProtectedRoutes, orderRoutes);

app.use(notFoundHandler);
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
