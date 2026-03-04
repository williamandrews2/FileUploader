// GET homepage
exports.homepageGet = (req, res) => {
  res.render("home", { user: req.user, title: "Home" });
};
