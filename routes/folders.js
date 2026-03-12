const { Router } = require("express");
const foldersRouter = Router();
const foldersController = require("../controllers/foldersController");
const { isAuthenticated } = require("../middleware/auth");

foldersRouter.get("/folders/new", foldersController.createFolderGet);

foldersRouter.post("/folders/new", foldersController.createFolderPost);

foldersRouter.get("/folders/:id", foldersController.viewFolder);

foldersRouter.get("/folders/:id/edit", foldersController.updateFolderGet);

foldersRouter.post("/folders/:id/edit", foldersController.updateFolderPost);

foldersRouter.post("/folders/:id/delete", foldersController.deleteFolder);

module.exports = foldersRouter;
