//this function checks a user's authentication status
export function checkAuthStatus(req, res, next) {
  //access session data already defined
  const userID = req.session.userID;
  const isAuth = req.session.isAuth;

  if (!userID) {
    //user is not authenticated, move to next middleware
    return next();
  }

  //user is authenticated, add global auth variables
  res.locals.userID = userID;
  res.locals.isAuth = true;
  res.locals.isAdmin = req.session.isAdmin; //user is admin or not
  //go to next middleware
  next();
}
