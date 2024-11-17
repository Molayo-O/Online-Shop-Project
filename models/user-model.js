import bcrypt from "bcryptjs";
import { MongoClient, ObjectId } from "mongodb";
import { getDb } from "../database/connectdb.js";

//determine what is stored in db for every user created
export class User {
  constructor(email, password, fullname, street, postal) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
    };
  }
  //functions(CRUD operations)
  async signup() {
    const hashedPwd = await bcrypt.hash(this.password, 12);
    await getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPwd,
      name: this.name,
      address: this.address,
    });
  }

  static async findById(userId) {
    const uid = new ObjectId(userId);
    return getDb().collection("users").findOne({ _id: uid }, { password: -1 }); //exlude password from fetch query
  }

  async getExistingUser() {
    //retrieve credentials from db
    return await getDb().collection("users").findOne({ email: this.email });
  }

  async validateEnteredPassword(hashedPwd) {
    return await bcrypt.compare(this.password, hashedPwd);
  }
}
