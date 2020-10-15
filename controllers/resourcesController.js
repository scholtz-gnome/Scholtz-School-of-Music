const resources_get = (req, res) => res.render("resources");

const custom_get = (req, res) => res.render("resources/custom");

module.exports = {
  resources_get,
  custom_get
}