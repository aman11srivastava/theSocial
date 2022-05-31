const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostsOfFollowing,
  updateCaption,
  addComment,
  deleteComment,
} = require("../controllers/postController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/create").post(isAuthenticated, createPost);
router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost);
router.route("/post/:id").delete(isAuthenticated, deletePost);
router.route("/posts").get(isAuthenticated, getPostsOfFollowing);
router.route("/post/:id").put(isAuthenticated, updateCaption);
router.route("/post/comment/:id").put(isAuthenticated, addComment);
router.route("/post/comment/:id").delete(isAuthenticated, deleteComment);

module.exports = router;
