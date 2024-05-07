const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const authentication = require("../middlewares/authentication");

router.post("/", authentication, CategoryController.createNewCategory);
router.get("/", authentication, CategoryController.getAllCategories);
router.put("/:id", authentication, CategoryController.updateCategoryById);
router.delete("/:id", authentication, CategoryController.deleteCategoryById);

module.exports = router;
