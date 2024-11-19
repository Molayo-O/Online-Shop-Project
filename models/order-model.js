import { MongoClient, ObjectId } from "mongodb";
import { getDb } from "../database/connectdb.js";

export class Order {
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.id = orderId;
  }

  //instantiate orderdata and transform into new object data
  static transformOrderDocument(orderData) {
    return new Order(
      orderData.productData,
      orderData.userData,
      orderData.status,
      orderData.date,
      orderData._id
    );
  }

  //helper method
  static transformOrderDocuments(orderData) {
    if (!Array.isArray(orderData)) {
      return [];
    }

    return orderData.map(this.transformOrderDocument);
  }

  static async findAll() {
    const orders = await getDb()
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .toArray();

    return this.transformOrderDocuments(orders);
  }

  static async findAllForUser(userId) {
    const uid = new ObjectId(userId);
    const orders = await getDb()
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 }) //sort by id
      .toArray();

    return this.transformOrderDocuments(orders);
  }

  static async findById(orderId) {
    const order = await getDb()
      .collection("orders")
      .findOne({ _id: new ObjectId(orderId) });

    return this.transformOrderDocument(order);
  }

  save() {
    if (this.id) {
      //update order status
      const orderId = new ObjectId(this.id);
      return getDb()
        .collection("orders")
        .updateOne({ _id: orderId }, { $set: { status: this.status } });
    } else {
      const orderData = {
        userData: this.userData,
        productData: this.productData,
        date: new Date(),
        status: this.status,
      };
      return getDb().collection("orders").insertOne(orderData);
    }
  }
}
