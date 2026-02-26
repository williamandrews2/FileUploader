// GET homepage
exports.homepageGet = (req, res) => {
  res.render("index", { user: req.user });
};
