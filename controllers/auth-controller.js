//import user class
const User = require("../models/user-model");

function getSignup(req, res) {
  res.render("customers/authentication/signup");
}

async function signup(req, res) {
  //retrieve and validate data
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

function getLogin(req, res) {
  res.render("customers/authentication/login");
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
};
