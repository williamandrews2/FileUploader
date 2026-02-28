const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

// GET login page
authRouter.get("/login", authController.loginGet);

// POST login page
authRouter.post("/login", authController.loginPost);

// GET register page
authRouter.get("/register", authController.registerGet);

// POST register a new user
authRouter.post("/register", authController.registerPost);

module.exports = authRouter;
