import { Order } from "../models/order-model.js";
import { User } from "../models/user-model.js";

//Get orders for specific user
export async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.userID);
    res.render("customers/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

export async function submitOrder(req, res, next) {
  const cart = res.locals.cart;
  let userData;

  try {
    userData = await User.findById(res.locals.userID);
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
  //remove order data
  req.session.cart = null;
  res.redirect("/orders");
}
