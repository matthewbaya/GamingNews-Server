const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/add-user", UserController.registerUser);
router.post("/login", UserController.loginUser);

module.exports = router;
