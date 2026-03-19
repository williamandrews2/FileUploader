const { Router } = require("express");
const foldersRouter = Router();
const foldersController = require("../controllers/foldersController");
const { isAuthenticated } = require("../middleware/auth");

foldersRouter.get(
  "/folders/new",
  isAuthenticated,
  foldersController.createFolderGet,
);

foldersRouter.post(
  "/folders/new",
  isAuthenticated,
  foldersController.createFolderPost,
);

foldersRouter.get(
  "/folders/:id",
  isAuthenticated,
  foldersController.viewFolder,
);

foldersRouter.get(
  "/folders/:id/edit",
  isAuthenticated,
  foldersController.updateFolderGet,
);

foldersRouter.post(
  "/folders/:id/edit",
  isAuthenticated,
  foldersController.updateFolderPost,
);

foldersRouter.post(
  "/folders/:id/delete",
  isAuthenticated,
  foldersController.deleteFolder,
);

module.exports = foldersRouter;
