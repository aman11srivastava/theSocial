const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const cloudinary = require("cloudinary");

exports.createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "theSocial-posts"
    });
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };
    const post = await Post.create(newPostData);
    const user = await User.findById(req.user._id);
    user.posts.unshift(post._id);
    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.likeAndUnlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    } else {
      if (post.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      await Post.findByIdAndDelete(id);
      const user = await User.findById(req.user._id);
      const index = user.posts.indexOf(id);
      user.posts.splice(index, 1);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Post deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getPostsOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes comments.user");

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised",
      });
    }
    const { caption } = req.body;
    post.caption = caption;
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (!req.body.comment) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty",
      });
    }
    let commentExists = false;
    let commentIndex = 0;
    post.comments.forEach((comment, index) => {
      if (comment.user.toString() === req.user._id.toString()) {
        commentExists = true;
        commentIndex = index;
      }
    });
    if (commentExists) {
      post.comments[commentIndex].comment = req.body.comment;
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Comment Updated",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
      await post.save();
      return res.status(201).json({
        success: true,
        message: "Comment Added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.owner.toString() === req.user._id.toString()) {
      if (!req.body.commentId) {
        return res.status(400).json({
          success: false,
          message: "No comment selected",
        });
      }
      post.comments.forEach((comment, index) => {
        if (comment._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      post.save();
      return res.status(200).json({
        success: true,
        message: "You have deleted one comment",
      });
    } else {
      post.comments.forEach((comment, index) => {
        if (comment.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      return res.status(200).json({
        success: true,
        message: "You have deleted your comment",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
