const upload = require("./upload");

const handleUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      req.flash("uploadError", err.message);
      return res.redirect("/upload");
    }
    next();
  });
};

module.exports = handleUpload;
