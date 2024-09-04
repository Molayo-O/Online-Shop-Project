//Handling product routes here
import express from "express";

const router = express.Router();

router.get("/catalogue", function (req, res) {
  res.render("customers/products/catalogue");
});

export default router;
