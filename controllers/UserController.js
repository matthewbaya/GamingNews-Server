const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async registerUser(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      const [type, token] = req.headers.authorization.split(" ");
      let user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        message: "New user registered",
        user: { id: user.id, email: user.email },
      });
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "InvalidInput" };
      }
      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidInput" };
      }
      const compare = comparePassword(password, user.password);
      if (!compare) {
        throw { name: "InvalidInput" };
      }
      let token = createToken({ id: user.id });
      res
        .status(200)
        .json({ email: user.email, role: user.role, access_token: token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
