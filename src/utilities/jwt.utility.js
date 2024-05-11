const { env_secret_key } = require("../config/dotenv.config");

const secretKey = env_secret_key;

exports.EncodeToken = (email, user_id) => {
  let EXPIRE = { expiresIn: "24h" };
  let PAYLOAD = {
    email: email,
    user_id: user_id,
  };
  return jwt.sign(PAYLOAD, secretKey, EXPIRE);
};

exports.DecodeToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    return null;
  }
};