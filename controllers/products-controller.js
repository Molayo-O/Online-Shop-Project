import { Product } from "../models/product-model.js";

export async function getAllProducts(req, res, next) {
  //retrieve all products
  try {
    const products = await Product.retrieveAllProducts();
    res.render("customers/products/catalogue", { products: products });
  } catch (error) {
    next(error);
  }
}

export async function getSingleProduct(req, res, next) {
  //retrieve single product
  try {
    const product = await Product.findProductId(req.params.id);
    res.render("customers/products/product-detail", { product: product });
  } catch (error) {
    next(error);
  }
}
