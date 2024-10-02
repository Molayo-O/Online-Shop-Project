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

export async function getEditProduct(req, res, next) {
  try {
    const product = await Product.findProductId(req.params.id);
    res.render("admin/products/edit-product", { product: product });
  } catch (error) {
    next(error);
  }
}

export async function editProduct(req, res, next) {
  //Store in database
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });
  console.log(product);

  if (req.file) {
    //replace old image with new image
    product.replaceImage(req.file.filename);
  }

  try {
    await product.insert();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

export async function deleteProduct(req, res, next) {
  //find existing product
  try {
    const product = await Product.findProductId(req.params.id);
    //delete product
    await product.delete();
  } catch (error) {
    return next(error);
  }
  //We do not redirect here because we used ajax to delete product w/o reloading

  res.json({message: 'Deleted Product'});
}
