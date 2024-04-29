const ArticleController = require("../controllers/ArticleController");
const router = require("express").Router();

router.post("/", ArticleController.postNewArticle);
router.get("/", ArticleController.getAllArticle);

module.exports = router;
