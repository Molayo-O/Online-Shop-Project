//import user class
import { User } from "../models/user-model.js";

export function getSignup(req, res) {
  res.render("customers/authentication/signup");
}

export async function signup(req, res) {
  //retrieve user Data
  const userData = req.body;
  const newUser = new User(
    userData.email,
    userData.password,
    userData.fullname,
    userData.street,
    userData.postal
  );

  //store user in db and redirect

  await newUser.signup();
  res.redirect("/login");
}

export function getLogin(req, res) {
  res.render("customers/authentication/login");
}

