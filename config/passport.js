const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const prisma = require("../prisma/prismaClient");

// setting up passport local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // search for user in the database
      const user = await prisma.user.findUnique({
        where: { username },
      });

      // check username
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // check password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// store the user ID in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// req.user gets populated here
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
