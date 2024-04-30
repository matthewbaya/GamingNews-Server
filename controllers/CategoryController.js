const { Category } = require("../models");

class CategoryController {
  static async createNewCategory(req, res) {
    try {
      let { name } = req.body;
      console.log(name);
      let category = await Category.create({ name });
      res.status(201).json({ message: "New Category has been created" });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

module.exports = CategoryController;
