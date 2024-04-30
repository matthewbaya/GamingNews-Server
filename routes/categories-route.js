const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/", CategoryController.createNewCategory);

module.exports = router;