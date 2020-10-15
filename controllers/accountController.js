const User = require("../models/User");

const account_get = (req, res) => res.render("account");

const lessons_get = (req, res) => res.render("account/lessons");

const invoices_get = (req, res) => res.render("account/invoices");

const login_get = (req, res) => res.render("account/login");

const signup_get = (req, res) => res.render("account/signup");

const signup_post = async (req, res) => {
  const { first, last, email, password } = req.body;
  try {
    User.create({ first, last, email, password });
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  account_get,
  lessons_get,
  invoices_get,
  login_get,
  signup_get,
  signup_post
}