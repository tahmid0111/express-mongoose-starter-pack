const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const {
  env_cloud_name,
  env_api_key,
  env_api_secret,
} = require("../config/dotenv.config");

cloudinary.config({
  cloud_name: env_cloud_name,
  api_key: env_api_key,
  api_secret: env_api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "users",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = storage;
