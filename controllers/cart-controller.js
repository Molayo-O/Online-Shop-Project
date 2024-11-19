import { Product } from "../models/product-model.js";
import { Cart } from "../models/cart-model.js";

export function showCart(req, res) {
  res.render("customers/user-cart/cart");
}
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
    message: "Cart updated",
    totalItems: cart.totalQuantity,
  });
}

export async function updateCartItem(req, res, next) {
  const cart = res.locals.cart;
  const updatedItemData = cart.updateItem(
    req.body.productId,
    +req.body.quantity
  );
  //update session cart
  req.session.cart = cart;
  res.status(201).json({
    message: "Item updated",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}
