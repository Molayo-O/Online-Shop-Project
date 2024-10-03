import { Cart } from "../models/cart-model.js";

export function initializeCart(req, res, next) {
  let cart;

  //determine if user doesn't hv a cart in session(upon first visit)
  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const sessionCart = req.session.cart;
    cart = new Cart(
      sessionCart.items,
      sessionCart.totalQuantity,
      sessionCart.totalPrice
    );
  }

  //make cart available globally
  res.locals.cart = cart;
  next();
}
