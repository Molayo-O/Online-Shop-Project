//Function to create session data

export function createSessionData(req, user, action) {
  //create and store session data
  req.session.userID = user._id.toString();
  req.session.isAuth = true;
  req.session.isAdmin = user.isAdmin;
  //save session data
  req.session.save(action);
}

export function destroyUserSessionData(req) {
  req.session.userID = null;
  req.session.isAuth = false;
}
