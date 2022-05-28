const express = require("express");
const {
  registerUser,
  loginUser,
  followUnfollowUser,
  logoutUser,
  uppdatePassword,
  updateProfile,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/follow/:id").get(isAuthenticated, followUnfollowUser);
router.route("/logout").get(logoutUser);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/update/password").put(isAuthenticated, uppdatePassword);
module.exports = router;
