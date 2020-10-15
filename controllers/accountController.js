const account_get = (req, res) => res.render("account");

const lessons_get = (req, res) => res.render("account/lessons");

const invoices_get = (req, res) => res.render("account/invoices");

const login_get = (req, res) => res.render("account/login");

const signup_get = (req, res) => res.render("account/signup");

module.exports = {
  account_get,
  lessons_get,
  invoices_get,
  login_get,
  signup_get
}