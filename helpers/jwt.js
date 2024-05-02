var jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

const createToken = (payload) => {
  const token = jwt.sign(payload, secretKey);
  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, secretKey);
  return payload;
};
module.exports = { createToken, verifyToken };
