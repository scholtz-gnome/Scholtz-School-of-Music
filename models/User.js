const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  first: {
    type: String,
    required: [true, "First name is required"]
  },
  last: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: [8, "Minimum password length is 8 characters"]
  },
  verified: {
    type: Boolean,
    default: false
  },
  role: {
    admin: Boolean,
    student: Boolean,
    parent: Boolean
  },
  children: Array,
  randomString: Number,
  created_at: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
}

const User = mongoose.model("user", userSchema);

module.exports = User;