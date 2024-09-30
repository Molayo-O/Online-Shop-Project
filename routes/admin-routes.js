//All admin-related routes defined here

import express from "express";
import {
  getProducts,
  getNewProduct,
  createNewProduct,
  getEditProduct,
  editProduct,
} from "../controllers/admin-controller.js";

import { handleImageUploadMiddleWare } from "../middlewares/handle-image-upload.js";
const router = express.Router();

router.get("/products", getProducts);

router.get("/products/new-product", getNewProduct);

router.post(
  "/products/new-product",
  handleImageUploadMiddleWare,
  createNewProduct
);

router.get('/products/:id', getEditProduct);
router.post('/products/:id', editProduct);

export default router;
