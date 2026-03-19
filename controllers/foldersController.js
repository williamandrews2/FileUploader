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
    const newFolder = prisma.folder.create({
      data: {
        name: folderName,
        userId: req.user.id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

exports.viewFolder = (req, res) => {};

exports.updateFolderGet = (req, res) => {};

exports.updateFolderPost = (req, res) => {};

exports.deleteFolder = (req, res) => {};
