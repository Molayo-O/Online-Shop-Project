const bcrypt = require("bcryptjs");
const db = require("../database/connectdb");

//determine what is stored in db for every user created
class User {
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
    //hash password
    const hashedPwd = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPwd,
      name: this.name,
      address: this.address
    });
  }
}

module.exports = User;
