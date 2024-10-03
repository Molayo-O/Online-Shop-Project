//Handling product routes here
import express from "express";
import { getAllProducts } from "../controllers/products-controller.js";
const router = express.Router();

router.get("/catalogue", getAllProducts);

export default router;
