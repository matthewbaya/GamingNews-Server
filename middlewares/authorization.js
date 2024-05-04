async function adminAuthorization(req, res, next) {
  try {
    const role = req.user.role;
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
    const { Article } = require("../models");
    const role = req.user.role;
    let article = await Article.findOne({ where: { id: req.params.id } });
    if (!article) {
      throw { name: "InvalidData" };
    }
    if (role === "Admin") {
      next();
      return;
    } else if (role === "Staff" && req.user.id === article.id) {
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
