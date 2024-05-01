const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw { name: "InvalidToken" };
    }
    let [bearer, token] = bearerToken.split(" ");
    // console.log(token);

    if (!bearer) {
      throw { name: "InvalidToken" };
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw { name: "InvalidToken" };
    }
    // console.log(payload);
    let user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      throw { name: "InvalidToken" };
    }
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
