const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  discipline: String,
  lessons: Number,
  level: String,
  process: {
    type: Number,
    default: 0
  },
  student: {
    parent: {
      is_parent: Boolean,
      first: String,
      last: String,
      email: String,
      cell: String
    },
    student: {
      is_student: Boolean,
      first: String,
      last: String,
      age: Number,
      gender: String,
      email: String,
      cell: String
    }
  },
  submitted_at: {
    type: Date,
    default: Date.now()
  }
});

const Registration = mongoose.model("registration", registrationSchema);

module.exports = Registration;