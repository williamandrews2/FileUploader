const prisma = require("../prisma/prismaClient");

exports.dashboardGet = async (req, res) => {
  try {
    // grab all the folder to show on the dashboard
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
    });

    // grab all the files that are in the root directory to show on the dashboard
    const files = await prisma.file.findMany({
      where: { userId: req.user.id, folderId: null },
    });

    res.render("dashboard", {
      title: "dashboard",
      folders,
      files,
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
