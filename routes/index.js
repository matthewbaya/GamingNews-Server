const router = require("express").Router();

router.use("/articles", require("./article-route"));

module.exports = router;
