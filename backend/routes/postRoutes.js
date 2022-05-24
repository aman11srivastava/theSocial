const express = require("express");
const { createPost } = require("../controllers/postController");

const router = express.Router();

router.route("/post/upload").post(createPost);

module.exports = router;
