const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  discipline: String,
  lessons: Number,
  level: String,
  is_parent: Boolean,
  process: {
    type: Number,
    default: 0
  },
  parent: {
    first: String,
    last: String,
    email: String,
    cell: String
  },
  student: {
    first: String,
    last: String,
    age: Number,
    gender: String,
    email: String,
    cell: String
  },
  submitted_at: {
    type: Date,
    default: Date.now()
  }
});

const Registration = mongoose.model("registration", registrationSchema);

module.exports = Registration;