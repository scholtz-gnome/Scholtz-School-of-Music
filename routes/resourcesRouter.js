const express = require("express");
const resourcesRouter = express.Router();
const resourcesController = require("../controllers/resourcesController");

resourcesRouter.get("/", resourcesController.resources_get);
resourcesRouter.get("/custom", resourcesController.custom_get);

module.exports = resourcesRouter;