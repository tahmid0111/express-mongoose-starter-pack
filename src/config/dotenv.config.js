require("dotenv").config();

module.exports = {
  env_port: process.env.PORT,
  env_url: process.env.URL,
  env_secret_key: process.env.SECRET_KEY,
  env_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  env_api_key: process.env.CLOUDINARY_API_KEY,
  env_api_secret: process.env.CLOUDINARY_API_SECRET,
};
