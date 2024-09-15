import { Product } from "../models/product-model.js";

export function getProducts(req, res) {
  res.render("admin/products/all-products");
}

export function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

export async function createNewProduct(req, res, next) {
  //Store in database
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    product.insert();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}
