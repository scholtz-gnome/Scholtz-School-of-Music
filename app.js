const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const authMiddleware = require("./middleware/authMiddleware");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

// Routers
const resourcesRouter = require("./routes/resourcesRouter");
const contactRouter = require("./routes/contactRouter");
const accountRouter = require("./routes/accountRouter");
const joinRouter = require("./routes/joinRouter");
const dashboardRouter = require("./routes/dashboardRouter");

// Middleware
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// View Engines
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

const config = {
  DB_CONNECTION: process.env.DB_CONNECTION,
  PORT: process.env.PORT
}

// Routes
app.use(authMiddleware.checkUser);

app.get("/", (req, res) => res.render("home"));

app.use("/join", joinRouter);

app.use("/resources", resourcesRouter);

app.use("/contact", contactRouter);

app.use("/account", accountRouter);

app.use("/dashboard", dashboardRouter);

app.use((req, res) => res.render("404"));

// Connect to DB
(async () => {
  try {
    await mongoose.connect(config.DB_CONNECTION, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Connected to DB");
    app.listen(config.PORT || 3000, () => console.log(`Listening for requests on port ${config.PORT}`));
  }
  catch (err) {
    console.log(err)
  }
})();