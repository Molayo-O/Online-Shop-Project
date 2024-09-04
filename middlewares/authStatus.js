//this function checks a user's authentication status
export function checkAuthStatus(req, res, next) {
  //access session data already defined
  const userID = req.session.userID;

  if (!userID) {
    //user is not authenticated, move to next middleware
    return next();
  }

  //user is authenticated, add global auth variables
  res.locals.userID = userID;
  res.locals.isAuth = true;
  //go to next middleware
  next();
}
