const express = require("express");
const app = express();
require("dotenv").config();
const path = require("node:path");
const passport = require("./config/passport");
const session = require("express-session");
// const LocalStrategy = require("passport-local").Strategy;
// const prisma = require("./prisma/prismaClient");
// const bcrypt = require("bcryptjs");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

// importing flash
const flash = require("connect-flash");
app.use(flash());

// locals object used to make the user variable
// available to all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// port variable
const PORT = process.env.PORT || 3030;

// route variables
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

app.use("/", indexRouter);
app.use("/", authRouter);

// start the server
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app - listening on port ${PORT}!`);
});
