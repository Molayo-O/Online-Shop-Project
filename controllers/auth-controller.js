//import user class
import { User } from "../models/user-model.js";
import {
  createSessionData,
  destroyUserSessionData,
} from "../utilities/authSession.js";

export function getSignup(req, res) {
  res.render("customers/authentication/signup");
}

export async function signup(req, res, next) {
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
  try {
    await newUser.signup();
  } catch (error) {
    //call error handling middleware
    return next(error);
  }
  res.redirect("/login");
}

export function getLogin(req, res) {
  res.render("customers/authentication/login");
}

export async function login(req, res, next) {
  const userLoginInfo = req.body;
  const user = new User(userLoginInfo.email, userLoginInfo.password);
  //retrieve existing user
  let existingUser;
  try {
    existingUser = await user.getExistingUser();
  } catch (error) {
    //call error handling middleware
    return next(error);
  }
  //validate credentials
  if (!existingUser) {
    //user is not authenticated
    res.redirect("/login");
    return;
  }

  //validate entered password
  const isPasswordCorrect = await user.validateEnteredPassword(
    existingUser.password
  );
  if (!isPasswordCorrect) {
    //user is not authenticated
    res.redirect("/login");
    return;
  }

  //user is authenticated, add & save session data, then redirect
  createSessionData(req, existingUser, function () {
    res.redirect("/");
  });
}

export function logout(req, res) {
  //delete session data
  destroyUserSessionData(req);
  //redirect
  res.redirect("/login");
}
