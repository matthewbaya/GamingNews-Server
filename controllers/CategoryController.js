const { where } = require("sequelize");
const { Category } = require("../models");

class CategoryController {
  static async createNewCategory(req, res, next) {
    try {
      let { name } = req.body;
      console.log(name);
      let category = await Category.create({ name });
      res.status(201).json({ message: "New Category has been created" });
    } catch (error) {
      next(error);
    }
  }

  static async getAllCategories(req, res, next) {
    try {
      let categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategoryById(req, res, next) {
    try {
      let { name } = req.body;
      let category = await Category.findByPk(req.params.id);
      if (!category) {
        throw { name: "InvalidData" };
      }
      await category.update({ name });
      res.status(200).json({ message: "Category has been updated", category });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoryById(req, res, next) {
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
      next(error);
    }
  }
}

module.exports = CategoryController;
