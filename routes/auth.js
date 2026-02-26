const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

// GET login page
authRouter.get("/login", authController.loginGet);

// POST login page

module.exports = authRouter;
