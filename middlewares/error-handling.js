//this function handles any errors generated from other middlewares/route handlers
export function handleErrors(error, req, res, next) {
  console.log(error);

  if (error.code == 404) {
    return res.status(404).render("shared-views/404-error");
  }
  res.status(500).render("shared-views/500-error");
}
