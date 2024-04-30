const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async registerUser(req, res) {
    try {
      res.send("masuk");
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async loginUser(req, res) {
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
      // console.log(error);
      if (error.name === "InvalidInput") {
        res.status(401).json({ message: "Invalid email/password" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

module.exports = UserController;
