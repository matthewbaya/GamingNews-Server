const router = require("express").Router();
const ArticleController = require("../controllers/ArticleController");
const CategoryController = require("../controllers/CategoryController");

router.get("/articles", ArticleController.getPublicArticles);
router.get("/categories", CategoryController.getAllCategories);
router.get("/articles/:id", ArticleController.getPublicArticleById);

module.exports = router;
