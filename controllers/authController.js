const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");

// GET login page
exports.loginGet = (req, res) => {
  res.render("login", { messages: req.flash("error") });
};

// POST login page
exports.loginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

// GET logout the user
exports.logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

// GET register page
exports.registerGet = (req, res) => {
  res.render("register", { errors: [] });
};

// POST register a new user
exports.registerPost = async (req, res) => {
  try {
    const { firstName, lastName, username, password, confirmPassword } =
      req.body;

    // validation for registration:
    const errors = [];

    // check if the username is taken
    const usernameCheck = await prisma.user.findUnique({
      where: { username: username },
    });
    if (usernameCheck) {
      errors.push(
        "That username is already taken! Please try another username.",
      );
    }

    // check that all fields are filled in
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      errors.push("All fields are required!");
    }

    // check that both passwords match
    if (password !== confirmPassword) {
      errors.push("The passwords do not match.");
    }

    // check password length
    if (password && password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }

    // render the form again with prefilled info if there are errors
    if (errors.length > 0) {
      return res.render("register", {
        errors,
        firstName,
        lastName,
        username,
      });
    }

    console.log("Hashing password");
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Attemping db insert...");
    // insert new user into the database
    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: hashedPassword,
      },
    });

    console.log("Logging user in...");
    // log the user in immediately after registration
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    console.log("There was an error with POST on register!");
    console.error(error);
    res.render("register", { errors: ["Error creating account!"] });
  }
};
