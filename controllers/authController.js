const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// GET login page
exports.loginGet = (req, res) => {
  res.render("login", { messages: req.flash("error") });
};

// POST login page
exports.loginPost = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
});
