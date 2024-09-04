//import user class
import { User } from "../models/user-model.js";
import {
  createSessionData,
  destroyUserSessionData,
} from "../utilities/authSession.js";
import { isformDataValid } from "../utilities/validateUserData.js";
import {
  stickSessionData,
  retriveSessionData,
} from "../utilities/sticky-session-data.js";

export function getSignup(req, res) {
  let sessionData = retriveSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
      fullname: "",
      street: "",
      postal: "",
    };
  }
  res.render("customers/authentication/signup", { stickyData: sessionData });
}

export async function signup(req, res, next) {
  //retrieve user Data
  const userData = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
  };

  //validate user Data
  if (
    !isformDataValid(
      userData.email,
      userData.password,
      userData.fullname,
      userData.street,
      userData.postal
    )
  ) {
    //display sticky data
    stickSessionData(
      req,
      {
        errorMessage: "Please check provided credentials",
        ...userData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  //create user object
  const newUser = new User(
    userData.email,
    userData.password,
    userData.fullname,
    userData.street,
    userData.postal
  );

  let existingUser;
  try {
    //validate credentials
    existingUser = await newUser.getExistingUser();
    if (existingUser) {
      //user exists
      //display sticky data
      stickSessionData(
        req,
        {
          errorMessage: "User exists already, try log in?",
          ...userData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }
    //store user in db and redirect
    await newUser.signup();
  } catch (error) {
    //call error handling middleware
    return next(error);
  }
  res.redirect("/login");
}

export function getLogin(req, res) {
  let sessionData = retriveSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customers/authentication/login", { stickyData: sessionData });
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

  const sessionErrorData = {
    errorMessage: "Please check provided credentials",
    email: user.email,
    password: user.password,
  };

  //validate credentials
  if (!existingUser) {
    //user is not authenticated
    //display sticky data
    stickSessionData(req, sessionErrorData, function () {
      res.redirect("/login");
    });
    return;
  }

  //validate entered password
  const isPasswordCorrect = await user.validateEnteredPassword(
    existingUser.password
  );
  if (!isPasswordCorrect) {
    //user is not authenticated
    //display sticky data
    stickSessionData(req, sessionErrorData, function () {
      res.redirect("/login");
    });
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
