//Handling base routes here
import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/catalogue");
});

export default router;
