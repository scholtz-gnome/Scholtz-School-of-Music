const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  title: String,
  category: String,
  filePath: String
});

const Resource = mongoose.model("resource", resourceSchema);

module.exports = Resource;