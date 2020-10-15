const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const expressLayouts = require("express-ejs-layouts");

// Routers
const resourcesRouter = require("./routes/resourcesRouter");
const contactRouter = require("./routes/contactRouter");
const accountRouter = require("./routes/accountRouter");

// Middleware
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());

// View Engines
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(res => {
    console.log("Connected to DB");
    app.listen(3000, () => console.log("Listening for requests on port 3000"));
  })
  .catch(err => console.log(err));

// Routes
app.get("/", (req, res) => res.render("home"));

app.use("/resources", resourcesRouter);

app.use("/contact", contactRouter);

app.use("/account", accountRouter);

app.use((req, res) => res.render("404"));