//Handling base routes here
import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/catalogue");
});

router.get("/401", function (req, res) {
  res.render("shared-views/401-error");
});

router.get("/403", function (req, res) {
  res.render("shared-views/403-error");
});

export default router;
