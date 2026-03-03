const { Router } = require("express");
const filesRouter = Router();
const filesController = require("../controllers/filesController");
const { isAuthenticated } = require("../middleware/auth");

// GET upload a file
filesRouter.get("/upload", isAuthenticated, filesController.uploadGet);

// POST upload a file
filesRouter.post("/upload", isAuthenticated, filesController.uploadPost);

// GET view a file's details
filesRouter.get(
  "/:id/details",
  isAuthenticated,
  filesController.fileDetailsGet,
);

// download a file
filesRouter.get("/:id/download", isAuthenticated, filesController.fileDownload);

// POST delete a file
filesRouter.post("/:id/delete", isAuthenticated, filesController.fileDelete);

module.exports = filesRouter;
