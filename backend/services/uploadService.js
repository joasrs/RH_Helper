const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `resources/curriculos/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileUpload = multer({
  storage: fileStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error("O arquivo precisa ser um PDF!"));
    }
    cb(undefined, true);
  },
});

module.exports = { fileUpload };
