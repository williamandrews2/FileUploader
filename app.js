const express = require("express");
const app = express();
require("dotenv").config();
const path = require("node:path");
const passport = require("./config/passport");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "layout"); // uses views/layout.ejs

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
const filesRouter = require("./routes/files");

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", filesRouter);

// start the server
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app - listening on port ${PORT}!`);
});
