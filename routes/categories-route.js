const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/", CategoryController.createNewCategory);
router.get("/", CategoryController.getAllCategories);
router.put("/:id", CategoryController.updateCategoryById);
module.exports = router;
