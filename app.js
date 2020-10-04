const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(3000, () => console.log("Listening for requests on port 3000"));

app.get("/", (req, res) => res.render("index"));