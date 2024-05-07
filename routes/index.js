const router = require("express").Router();
const articleRouter = require("./articles-route");
const categoryRouter = require("./categories-route");
const userRouter = require("./users-route");
const publicArticleRouter = require("./public-route");

router.use("/articles", articleRouter);
router.use("/categories", categoryRouter);
router.use("/users", userRouter);
router.use("/pub", publicArticleRouter);

module.exports = router;
