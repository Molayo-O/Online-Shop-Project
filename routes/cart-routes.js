//Handling authentication routes here
import express from "express";

//include controller file
import { addCartItem } from "../controllers/cart-controller.js";

const router = express.Router();

router.post("/items", addCartItem);


export default router;