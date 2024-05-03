const router = require("express").Router();
const articleRouter = require("./articles-route");
const categoryRouter = require("./categories-route");
const userRouter = require("./users-route");

router.use("/articles", articleRouter);
router.use("/categories", categoryRouter);
router.use("/users", userRouter);

module.exports = router;
