const { Router } = require("express");
const dashboardRouter = Router();
const dashboardController = require("../controllers/dashboardController");
const { isAuthenticated } = require("../middleware/auth");

dashboardRouter.get("/dashboard", dashboardController.dashboardGet);

module.exports = dashboardRouter;
