import { Product } from "../models/product-model.js";

export async function getProducts(req, res, next) {
  try {
    const products = await Product.retrieveAllProducts();

    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
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

export function getEditProduct(req, res) {
  res.render("admin/products/new-product")
}

export function editProduct(req, res) {
}
