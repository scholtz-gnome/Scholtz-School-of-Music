const account_get = (req, res) => res.render("account");

const lessons_get = (req, res) => res.render("account/lessons");

const invoices_get = (req, res) => res.render("account/invoices");

module.exports = {
  account_get,
  lessons_get,
  invoices_get
}