const express = require("express");
const contactRouter = express.Router();
const contactController = require("../controllers/contactController");

contactRouter.get("/", contactController.contact_get);
contactRouter.get("/ask", contactController.ask_get);

module.exports = contactRouter;