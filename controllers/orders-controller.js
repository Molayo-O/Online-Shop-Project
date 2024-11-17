import { Order } from "../models/order-model.js";
import { User } from "../models/user-model.js";

export function getOrders(req, res) {
  res.render("customers/orders/all-orders");
}

export async function submitOrder(req, res, next) {
  const cart = res.locals.cart;
  let userData;

  try {
    userData = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userData);
  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/orders");
}
