//Handling product routes here
import express from "express";
import { getAllProducts, getSingleProduct } from "../controllers/products-controller.js";
const router = express.Router();

router.get("/catalogue", getAllProducts);
router.get("/products/:id", getSingleProduct);


export default router;
