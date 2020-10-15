const express = require("express");
const accountRouter = express.Router();
const accountController = require("../controllers/accountController");

accountRouter.get("/", accountController.account_get);
accountRouter.get("/lessons/", accountController.lessons_get);
accountRouter.get("/invoices/", accountController.invoices_get);

module.exports = accountRouter;