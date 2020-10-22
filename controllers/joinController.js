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
    const registrationProcess = registration.process; 

    if (registrationProcess === 0) {
      res.render("join/details_one", { registration });
    } else if (registrationProcess === 1) {
      res.render("join/parent_details", { registration });
    } else if (registrationProcess === 2) {
      res.render("join/details_two", { registration });
    } else if (registrationProcess === 3) {
      res.render("join/details_three", { registration })
    }

  }
  catch (err) {
    console.log(err);
  }
}

const details_patch = async (req, res) => {

  const id = req.params.id;
  const { student, registrationProcess, first, last, email, cell, discipline, lessons, level } = req.body;

  try {

    if (registrationProcess === 0) {
      if (student === "student") {
        const registration = await Registration.findByIdAndUpdate(id, { process: 2, student: { student: { is_student: true } } });
        res.status(200).json({ redirect: `/join/${registration._id}` });
      } else {
        const registration = await Registration.findByIdAndUpdate(id, { process: 1, student: { parent: { is_parent: true } } });
        res.status(200).json({ redirect: `/join/${registration._id}` });
      }
    } else if (registrationProcess === 1) {
      const registration = await Registration.findByIdAndUpdate(id, { process: 2, student: { parent: { first, last, email, cell, is_parent: true } } });
      res.status(200).json({ redirect: `/join/${registration._id}` });
    } else if (registrationProcess === 2) {
      const registration = await Registration.findOneAndUpdate(id, { discipline, lessons, level, process: 3 });
      res.status(200).json({ redirect: `/join/${registration._id}` });
    }
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  join_get,
  join_post,
  join_details_get,
  details_patch
}