const Registration = require("../models/Registration");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

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
  const id = req.params.id;
  try {
    const registration = await Registration.findById(id);
    const registrationProcess = registration.process; 

    if (registrationProcess === 0) {
      res.render("join/details_one", { registration });
    } else if (registrationProcess === 1) {
      res.render("join/parent_details", { registration });
    } else if (registrationProcess === 2) {
      res.render("join/details_two", { registration });
    } else if (registrationProcess === 3) {
      res.render("join/details_three", { registration })
    } else if (registrationProcess === 4) {
      res.render("join/review", { registration });
    }

  }
  catch (err) {
    console.log(err);
  }
}

const details_patch = async (req, res) => {

  const id = req.params.id;
  const { student, discipline, lessons, level, registrationProcess, first, last, email, cell, age, gender, parent_first, parent_last, parent_email, parent_cell } = req.body;

  try {

    if (registrationProcess === 0) {
      if (student === "student") {
        const registration = await Registration.findByIdAndUpdate(id, { process: 2, is_parent: false });
        res.status(200).json({ redirect: `/join/${registration._id}` });
      } else {
        const registration = await Registration.findByIdAndUpdate(id, { process: 1, is_parent: true });
        res.status(200).json({ redirect: `/join/${registration._id}` });
      }
    } else if (registrationProcess === 1) {
      const registration = await Registration.findByIdAndUpdate(id, { process: 2, parent: { first, last, email, cell } });
      res.status(200).json({ redirect: `/join/${registration._id}` });
    } else if (registrationProcess === 2) {
      const registration = await Registration.findByIdAndUpdate(id, { discipline, lessons, level, process: 3 });
      res.status(200).json({ redirect: `/join/${registration._id}` });
    } else if (registrationProcess === 3) {
      const registration = await Registration.findByIdAndUpdate(id, { student: { age, gender, first, last, email, cell }, process: 4 });
      res.status(200).json({ redirect: `/join/${registration._id}` });
    }
      
  }
  catch (err) {
    console.log(err);
  }
}

const review_patch = async (req, res) => {

  const id = req.params.id;

  try {
    const registration = await Registration.findByIdAndUpdate(id, req.body);

    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    ejs.renderFile("./views/email/registration.ejs", { registration }, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        transporter.sendMail({
          from: "info@scholtzschoolofmusic.co.za",
          to: registration.parent.email,
          subject: `Email Confirmation for ${registration.student.first} ${registration.student.last}`,
          html: data
        }, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });
      }
    });

    res.status(200).json({ redirect: `/join/review/${registration._id}` });

  }
  catch (err) {
    console.log(err);
  }

}

const complete_get = async (req, res) => {
  const id = req.params.id;
  try {
    const registration = await Registration.findById(id);
    res.render("join/completed", { registration });
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  join_get,
  join_post,
  join_details_get,
  details_patch,
  review_patch,
  complete_get
}