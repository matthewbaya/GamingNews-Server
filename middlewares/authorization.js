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
    next(error);
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
    next(error);
  }
}

module.exports = { adminAuthorization, articleAuthorization };
