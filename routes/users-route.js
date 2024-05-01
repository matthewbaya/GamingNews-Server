const router = require("express").Router();
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const { adminAuthorization } = require("../middlewares/authorization");

router.post(
  "/add-user",
  authentication,
  adminAuthorization,
  UserController.registerUser
);
router.post("/login", UserController.loginUser);

module.exports = router;
