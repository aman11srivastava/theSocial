const Post = require("../models/PostModel");
const User = require("../models/UserModel");

exports.createPost = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: "req.body.public_id",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      },
      owner: req.user._id,
    };
    const post = await Post.create(newPostData);
    const user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save();
    res.status(201).json({
      success: true,
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
