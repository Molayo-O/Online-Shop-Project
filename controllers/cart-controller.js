import { Product } from "../models/product-model.js";
import { Cart } from "../models/cart-model.js";

export async function addCartItem(req, res, next) {
  let product;
  //find product id from db
  try {
    //console.log(req.body.productId); from ajax Body
    product = await Product.findProductId(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  const cart = res.locals.cart;
  cart.addItem(product);
  //update session cart
  req.session.cart = cart;

  res.status(201).json({
    message: 'Cart updated',
    totalItems: cart.totalQuantity
  });
}
