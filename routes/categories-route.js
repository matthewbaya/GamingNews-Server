const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/", CategoryController.createNewCategory);
router.get("/", CategoryController.getAllCategories);
router.put("/:id", CategoryController.updateCategoryById);
router.delete("/:id", CategoryController.deleteCategoryById);
module.exports = router;
