import bcrypt from "bcryptjs";
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
}
