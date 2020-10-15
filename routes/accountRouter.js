const express = require("express");
const accountRouter = express.Router();
const accountController = require("../controllers/accountController");

accountRouter.get("/", accountController.account_get);
accountRouter.get("/lessons/", accountController.lessons_get);
accountRouter.get("/invoices/", accountController.invoices_get);
accountRouter.get("/login", accountController.login_get);
accountRouter.post("/login", accountController.login_post);
accountRouter.get("/logout", accountController.logout_get);
accountRouter.get("/signup", accountController.signup_get);
accountRouter.post("/signup", accountController.signup_post);
accountRouter.get("/verify/:id", accountController.account_verify_get);
accountRouter.get("/:id", accountController.randomString_get);

module.exports = accountRouter;