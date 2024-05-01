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
    console.log(error);
    if (error.name === "InvalidToken") {
      res.status(401).json({ message: "Invalid user credentials" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = authentication;
