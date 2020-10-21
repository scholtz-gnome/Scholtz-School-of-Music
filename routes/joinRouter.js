const express = require("express");
const joinRouter = express.Router();
const joinController = require("../controllers/joinController");

joinRouter.get("/", joinController.join_get);
joinRouter.post("/:discipline", joinController.join_post);
joinRouter.patch("/:id", joinController.details_patch);
joinRouter.get("/:id", joinController.join_details_get);

module.exports = joinRouter;