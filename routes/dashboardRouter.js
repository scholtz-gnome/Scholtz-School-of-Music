const express = require("express");
const dashboardRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");

dashboardRouter.get("/registrations", dashboardController.registrations_get);

module.exports = dashboardRouter;