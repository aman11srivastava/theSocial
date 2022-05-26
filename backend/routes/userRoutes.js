const express = require("express");
const {
  registerUser,
  loginUser,
  followUnfollowUser,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/follow/:id").get(isAuthenticated, followUnfollowUser);

module.exports = router;
