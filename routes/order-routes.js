//Handling authentication routes here
import express from "express";

//include controller file
import { submitOrder, getOrders } from "../controllers/orders-controller.js";

const router = express.Router();

router.get('/', getOrders); //same as /orders/
router.post('/', submitOrder); //same as /orders/


export default router;