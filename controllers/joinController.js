const Registration = require("../models/Registration");

const join_get = (req, res) => res.render("join");

const join_post = async (req, res) => {
  const discipline = req.params.discipline;
  try {
    const registration = await Registration.create({ discipline });
    res.status(200).json({ redirect: `/join/${registration._id}` });
  }
  catch (err) {
    console.log(err);
  }
}

const join_details_get = async (req, res) => {
  const registration_id = req.params.id;
  try {
    const registration = await Registration.findById(registration_id);
    res.render("join/details_one", { registration });
  }
  catch (err) {
    console.log(err);
  }
}

const join_details_post = (req, res) => {
  
}

module.exports = {
  join_get,
  join_post,
  join_details_get,
  join_details_post
}