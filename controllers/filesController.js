// GET to upload a file
exports.uploadGet = (req, res) => {
  res.render("upload", { title: "Upload" });
};

// POST to upload file
exports.uploadPost = (req, res) => {};

// GET to view a file's details
exports.fileDetailsGet = (req, res) => {};

// download a file
exports.fileDownload = (req, res) => {};

// POST delete a file
exports.fileDelete = (req, res) => {};
