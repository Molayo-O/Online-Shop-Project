//All admin-related routes defined here

import express from "express";
import {
  getProducts,
  getNewProduct,
  createNewProduct,
  getEditProduct,
  editProduct,
  deleteProduct,
} from "../controllers/admin-controller.js";

import { handleImageUploadMiddleWare } from "../middlewares/handle-image-upload.js";
import { getOrders, updateOrder } from "../controllers/admin-controller.js";

const router = express.Router();

router.get("/products", getProducts);

router.get("/products/new-product", getNewProduct);

router.post(
  "/products/new-product",
  handleImageUploadMiddleWare,
  createNewProduct
);

router.get("/products/:id", getEditProduct);
router.post("/products/:id", handleImageUploadMiddleWare, editProduct);
//router to delete product
router.delete("/products/:id", deleteProduct);

//order routes
router.get('/orders', getOrders);
router.patch('/orders/:id', updateOrder);

export default router;
