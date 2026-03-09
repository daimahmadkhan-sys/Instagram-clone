const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "Insta-clone/posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    massege: "Post created successfully",
    post,
  });
}

async function getPostsController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({ user: userId });

  res.status(200).json({
    massege: "posts fetch successfully",
    posts,
  });
}

async function getPostDetailController(req, res) {
  const postId = req.params.postId;
  const userId = req.user.id;
  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      massege: "post not found!",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      massege: "Forbidden content",
    });
  }

  res.status(200).json({
    massege: "Detail post fetch successfully",
    post,
  });
}

module.exports = {
  createPostController,
  getPostsController,
  getPostDetailController,
};
