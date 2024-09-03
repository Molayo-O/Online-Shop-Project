//this function handles any errors generated from other middlewares/route handlers
function handleErrors(error, req, res, next) {
  console.log(error);
  res.status(500).render("shared-views/500-error");
}

module.exports = handleErrors;