import { Product } from "../models/product-model.js";

export async function getAllProducts(req, res) {
  //retrieve all products
  try {
    const products = await Product.retrieveAllProducts();
    res.render("customers/products/catalogue", { products: products });
  } catch (error) {
    next(error);
  }
}
