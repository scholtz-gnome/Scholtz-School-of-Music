const Resource = require("../models/Resource");

const fs = require("fs");
const path = require("path");
const { findById } = require("../models/Resource");

const resources_get = async (req, res) => {

  try {
    const resources = await Resource.find();
    res.render("resources", { resources });
  }
  catch (err) {
    console.log(err);
  }
}

const custom_get = (req, res) => res.render("resources/custom");

const upload_get = (req, res) => res.render("resources/upload");

const upload_post = async (req, res) => {

  console.log(req.file);

  const file = {
    title: req.body.title,
    category: req.body.category,
    filePath: `uploads/${req.file.filename}`
  }
  
  try {
    const resource = await Resource.create(file);
    res.redirect("/resources");
  }
  catch (err) {
    console.log(err);
  }

}

const download_post = async (req, res) => {
  const id = req.params.id;
  try {
    const resource = await Resource.findById(id);
    res.download(resource.filePath);
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  resources_get,
  custom_get,
  upload_get,
  upload_post,
  download_post
}