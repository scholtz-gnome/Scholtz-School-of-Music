const User = require("../models/User");
require("dotenv/config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

const handleErrors = (err) => {
  let errors = { first: "", last: "", email: "", password: "" };
  if (err.message === "Incorrect email") {
    errors.email = "That email address is not registered"
  }
  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect";
  }
  if (err.code === 11000) {
    errors.email = "That email already exists";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
}

const account_get = (req, res) => res.render("account");

const lessons_get = (req, res) => res.render("account/lessons");

const invoices_get = (req, res) => res.render("account/invoices");

const login_get = (req, res) => res.render("account/login");

const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors })
  }
}

const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
}

const signup_get = (req, res) => res.render("account/signup");

const signup_post = async (req, res) => {
  const { first, last, email, password } = req.body;
  const genNumber = () => Math.floor(Math.random() * 10000);
  const randomString = genNumber();
  try {
    const user = await User.create({ first, last, email, password, randomString });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    ejs.renderFile("./views/email/verify.ejs", { first, last, id: user.id, randomString }, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        transporter.sendMail({
          from: "scholtzschoolofmusic@gmail.com",
          to: email,
          subject: `Email Confirmation for ${first} ${last}`,
          html: data
        }, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });
      }
    });

    res.status(200).json({ redirect: `/account/verify/${email}` });

  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors })
  }
}

const account_verify_get = (req, res) => {
  const email = req.params.id;
  res.render("account/email-sent", { email });
}

const randomString_get = async (req, res) => {
  const randomString = req.params.id;
  try {
    const user = await User.findOne({ randomString });
    if (user) {
      await User.findByIdAndUpdate(user.id, { verified: true });
      const token = createToken(user);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).redirect("/");
    } else {
      res.render("account/failed");
    }
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
  login_post,
  logout_get,
  signup_get,
  signup_post,
  account_verify_get,
  randomString_get
}