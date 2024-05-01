async function adminAuthorization(req, res, next) {
  try {
    const role = req.user.role;
    // console.log(role);
    if (role !== "Admin") {
      throw { name: "Unauthorized" };
    } else {
      next();
    }
  } catch (error) {
    if (error.name === "Unauthorized") {
      res.status(403).json({ message: "You are not authorized" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

async function articleAuthorization(req, res, next) {
  try {
    const role = req.user.role;
    console.log(role);
    if (role === "Admin") {
      next();
      return;
    }
    const { Article } = require("../models");
    let article = await Article.findOne({ where: { id: req.params.id } });
    if (role === "Staff" && req.user.id === article.id) {
      next();
      return;
    } else {
      throw { name: "Unauthorized" };
    }
  } catch (error) {
    console.log(error);
    if (error.name === "Unauthorized") {
      res.status(403).json({ message: "You are not authorized" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = { adminAuthorization, articleAuthorization };
