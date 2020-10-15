const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// Routers
const resourcesRouter = require("./routes/resourcesRouter");
const contactRouter = require("./routes/contactRouter");
const accountRouter = require("./routes/accountRouter");

// Middleware
app.use(expressLayouts);
app.use(express.static("public"));

// View Engines
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

app.listen(3000, () => console.log("Listening for requests on port 3000"));

// Routes
app.get("/", (req, res) => res.render("home"));

app.use("/resources", resourcesRouter);

app.use("/contact", contactRouter);

app.use("/account", accountRouter);

app.use((req, res) => res.render("404"));