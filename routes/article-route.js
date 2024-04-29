const ArticleController = require("../controllers/ArticleController");
const router = require("express").Router();

router.post("/", ArticleController.postNewArticle);
router.get("/", ArticleController.getAllArticles);
router.get("/:id", ArticleController.getArticleById);
router.put("/:id", ArticleController.updateArticleById);

module.exports = router;
