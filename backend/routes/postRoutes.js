const express = require("express");
const { createPost } = require("../controllers/postController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/create").post(isAuthenticated, createPost);

module.exports = router;
