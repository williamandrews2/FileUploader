const supabase = require("../supabase/supabaseClient");

// GET to upload a file
exports.uploadGet = (req, res) => {
  res.render("upload", { title: "Upload" });
};

// POST to upload file
exports.uploadPost = async (req, res) => {
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
  res.redirect("/dashboard");
};

// GET to view a file's details
exports.fileDetailsGet = (req, res) => {};

// download a file
exports.fileDownload = (req, res) => {};

// POST delete a file
exports.fileDelete = (req, res) => {};
