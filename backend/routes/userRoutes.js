const express = require("express");
const {
  registerUser,
  loginUser,
  followUnfollowUser,
  logoutUser,
  uppdatePassword,
  updateProfile,
  deleteProfile,
  myProfile,
  getUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/follow/:id").get(isAuthenticated, followUnfollowUser);
router.route("/logout").get(logoutUser);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/update/password").put(isAuthenticated, uppdatePassword);
router.route("/delete/me").delete(isAuthenticated, deleteProfile);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/user/:id").get(isAuthenticated, getUserProfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
