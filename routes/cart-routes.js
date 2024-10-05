//Handling authentication routes here
import express from "express";

//include controller file
import { addCartItem, showCart } from "../controllers/cart-controller.js";

const router = express.Router();

router.get('/', showCart); //same as /cart/
router.post("/items", addCartItem);


export default router;