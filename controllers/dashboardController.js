const Registration = require("../models/Registration");

const registrations_get = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.render("dashboard/registrations", { registrations });
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  registrations_get
}