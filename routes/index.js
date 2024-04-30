const router = require("express").Router();

router.use("/articles", require("./articles-route"));
router.use("/categories", require("./categories-route"));

module.exports = router;
