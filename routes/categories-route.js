const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/", CategoryController.createNewCategory);
router.get("/", CategoryController.getAllCategories);

module.exports = router;
