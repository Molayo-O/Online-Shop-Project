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


  save() {
    if(this.id) {
        //update order
    }
    else {
        const orderData = {
            userData: this.userData,
            productData: this.productData,
            date: new Date(),
            status: this.status
        };
        return getDb().collection('orders').insertOne(orderData);
    }
    
  }
}
