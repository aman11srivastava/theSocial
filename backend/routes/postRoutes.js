const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostsOfFollowing,
  updateCaption,
} = require("../controllers/postController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/create").post(isAuthenticated, createPost);
router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost);
router.route("/post/:id").delete(isAuthenticated, deletePost);
router.route("/posts").get(isAuthenticated, getPostsOfFollowing);
router.route("/post/:id").put(isAuthenticated, updateCaption);

module.exports = router;