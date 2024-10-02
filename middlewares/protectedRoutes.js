export function handleProtectedRoutes(req, res, next) {
  //check if user is authenticated
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }

  //check is user is authorized
  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.redirect("/403");
  }

  next();
}
