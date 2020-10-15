const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// Routers
const contactRouter = require("./routes/contactRouter");

// Middleware
app.use(expressLayouts);
app.use(express.static("public"));

// View Engines
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

app.listen(3000, () => console.log("Listening for requests on port 3000"));

// Routes
app.get("/", (req, res) => res.render("home"));

app.get("/account", (req, res) => res.render("auth/account"));