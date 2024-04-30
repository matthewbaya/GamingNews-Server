const ArticleController = require("../controllers/ArticleController");
const router = require("express").Router();

router.post("/", ArticleController.postNewArticle);
router.get("/", ArticleController.getAllArticles);
router.get("/pub", ArticleController.getPublicArticles);
router.get("/pub/:id", ArticleController.getPublicArticleById);
router.get("/:id", ArticleController.getArticleById);
router.put("/:id", ArticleController.updateArticleById);
router.delete("/:id", ArticleController.deleteArticleById);

module.exports = router;
