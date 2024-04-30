const { where } = require("sequelize");
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

  static async getAllCategories(req, res) {
    try {
      let categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateCategoryById(req, res) {
    try {
      let { name } = req.body;
      let category = await Category.findByPk(req.params.id);
      if (!category) {
        throw { name: "InvalidData" };
      }
      await category.update({ name });
      res.status(200).json({ message: "Category has been updated", category });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({
          message: error.errors[0].message,
        });
      } else if (error.name === "InvalidData") {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async deleteCategoryById(req, res) {
    try {
      let category = await Category.findByPk(req.params.id);
      if (!category) {
        throw { name: "InvalidData" };
      }
      await category.destroy();
      res.status(200).json({
        message: `Category with the name of "${category.name}" has been succesfully deleted`,
      });
    } catch (error) {
      if (error.name === "InvalidData") {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

module.exports = CategoryController;
