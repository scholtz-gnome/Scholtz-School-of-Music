const contact_get = (req, res) => res.render("contact");

const ask_get = (req, res) => res.render("contact/ask");

module.exports = {
  contact_get,
  ask_get
}