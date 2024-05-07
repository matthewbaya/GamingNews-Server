const router = require("express").Router();
const ArticleController = require("../controllers/ArticleController");

router.get("/articles", ArticleController.getPublicArticles);
router.get("/articles/:id", ArticleController.getPublicArticleById);

module.exports = router;
