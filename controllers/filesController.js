const prisma = require("../prisma/prismaClient");
const supabase = require("../supabase/supabaseClient");

// GET to upload a file
exports.uploadGet = (req, res) => {
  res.render("upload", { title: "Upload" });
};

// POST to upload file
exports.uploadPost = async (req, res) => {
  try {
    const file = req.file; // multer will attach the file here
    const filePath = `${req.user.id}-${Date.now()}-${file.originalname}`;

    // upload call:
    const { data: uploadData, error } = await supabase.storage
      .from("uploads")
      .upload(filePath, file.buffer, { contentType: file.mimetype });
    console.log("Upload call initiated...");

    // public URL to save to database:
    const { data: urlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(filePath);
    console.log("Data from public URL:" + urlData.publicUrl);

    if (error) {
      console.error(error);
      return res.redirect("/dashboard");
    }
    console.log("Upload success!");

    // insert into the db
    const newFile = await prisma.file.create({
      data: {
        fileName: file.originalname,
        storedName: filePath,
        fileSize: file.size,
        mimeType: file.mimetype,
        path: urlData.publicUrl,
        userId: req.user.id,
      },
    });

    // redirect on successful upload
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    // TODO: Change this later to show an error message about the file upload.
    res.redirect("/dashboard");
  }
};

// GET to view a file's details
exports.fileDetailsGet = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = req.user;

    // look for the file in the database
    const file = await prisma.file.findUnique({
      where: { id: id },
    });

    // check if a file returned
    if (!file) {
      return res.redirect("/dashboard");
    }

    // render the page with file details
    res.render("fileDetails", { file, user: user, title: "File Details" });
  } catch (error) {
    console.error(error);
    // TODO: Change redirect on file view error (file not found, error 404 page, etc.)
    res.redirect("/dashboard");
  }
};

// download a file
exports.fileDownload = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const file = await prisma.file.findUnique({
      where: { id: id },
    });
    console.log(file.path);
    res.redirect(file.path);
  } catch (error) {
    console.error(error);
    res.redirect(`/${parseInt(req.params.id)}/details`);
  }
};

// POST delete a file
exports.fileDelete = (req, res) => {};
