const multer = require("multer");

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    // Rename the file to include the timestamp
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = storage;
