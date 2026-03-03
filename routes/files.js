const { Router } = require("express");
const filesRouter = Router();
const filesController = require("../controllers/filesController");

// GET upload a file
filesRouter.get("/upload", filesController.uploadGet);

// POST upload a file
filesRouter.post("/upload", filesController.uploadPost);

// GET view a file's details
filesRouter.get("/:id/details", filesController.fileDetailsGet);

// download a file
filesRouter.get("/:id/download", filesController.fileDownload);

// POST delete a file
filesRouter.post("/:id/delete", filesController.fileDelete);
