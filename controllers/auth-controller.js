function getSignup(req, res) {
    res.render("customers/authentication/signup");
}

function getLogin(req, res) {
  //   res.render("/");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
};
