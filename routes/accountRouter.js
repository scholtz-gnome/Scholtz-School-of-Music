const express = require("express");
const accountRouter = express.Router();

accountRouter.get("/", accountController.account_get);

module.exports = accountRouter;