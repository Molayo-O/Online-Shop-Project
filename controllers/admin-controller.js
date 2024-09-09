export function getProducts(req, res) {
  res.render("admin/products/all-products");
}

export function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

export function createNewProduct() {}
