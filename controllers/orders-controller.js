import Stripe from "stripe";
import { configDotenv } from "dotenv";
configDotenv();
const stripeObj = Stripe(process.env.STRIPE_API_KEY);

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

  //Make stripe payment
  const session = await stripeObj.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cart.items.map(function (item) {
      return {
        price_data: {
          currency: "cad",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price.toFixed(2) * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/failure`,
  });

  res.redirect(303, session.url);
}

export function getSuccess(req, res) {
  res.render("customers/orders/success");
}

export function getFailure(req, res) {
  res.render("customers/orders/failure");
}
