const ArticleController = require("../controllers/ArticleController");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  articleAuthorization,
} = require("../middlewares/authorization");
const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", authentication, ArticleController.postNewArticle);
router.get("/", authentication, ArticleController.getAllArticles);
router.get("/pub", ArticleController.getPublicArticles);
router.get("/pub/:id", ArticleController.getPublicArticleById);
router.get("/:id", authentication, ArticleController.getArticleById);
router.put(
  "/:id",
  authentication,
  articleAuthorization,
  ArticleController.updateArticleById
);
router.patch(
  "/:id/img",
  upload.single("article_image"),
  ArticleController.updateArticleImage
);
router.delete(
  "/:id",
  authentication,
  articleAuthorization,
  ArticleController.deleteArticleById
);

module.exports = router;
