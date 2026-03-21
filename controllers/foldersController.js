const prisma = require("../prisma/prismaClient");

exports.createFolderGet = (req, res) => {
  res.render("createFolder", { title: "Create Folder", errors: [] });
};

exports.createFolderPost = async (req, res) => {
  try {
    const { folderName } = req.body;
    const errors = [];

    // error handling
    // check if the folder name is empty
    if (folderName === null || folderName.trim() === "") {
      errors.push("Folder name is required!");
    }

    // render the errors
    if (errors.length > 0) {
      return res.render("createFolder", {
        title: "Create Folder",
        errors,
        folderName,
      });
    }

    // post the folder to prisma
    const newFolder = await prisma.folder.create({
      data: {
        name: folderName,
        userId: req.user.id,
      },
    });

    // redirect to the dashboard on success
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

exports.viewFolder = async (req, res) => {
  try {
    const folderId = parseInt(req.params.id);
    const folder = await prisma.folder.findUnique({
      where: { id: folderId, userId: req.user.id },
    });

    // ensure there is a folder that was returned
    if (!folder) {
      return res.redirect("/dashboard");
    }

    // get all the files that are in this folder that belong to the user
    const files = await prisma.file.findMany({
      where: { folderId: folderId, userId: req.user.id },
    });

    res.render("folderContents", {
      title: folder.name,
      folder,
      files,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/dashboard");
  }
};

exports.updateFolderGet = async (req, res) => {
  const folder = await prisma.folder.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.render("editFolder", { folder, errors: [], title: "Update Folder" });
};

exports.updateFolderPost = async (req, res) => {
  const id = parseInt(req.params.id);
  const { folderName } = req.body;
  const errors = [];

  if (!folderName || folderName.trim() === "") {
    errors.push("Folder name is required!");
  }

  if (errors.length > 0) {
    const folder = await prisma.folder.findUnique({ where: { id } });
    return res.render("editFolder", { folder, errors, folderName });
  }

  await prisma.folder.update({
    where: { id },
    data: { name: folderName },
  });

  res.redirect(`/folders/${id}`);
};

exports.deleteFolder = (req, res) => {};
