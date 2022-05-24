const Post = require("../models/PostModel");

exports.createPost = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: "req.body.public_id",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      },
      //   owner: req.user._id,
    };
    const post = await Post.create(newPostData);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
