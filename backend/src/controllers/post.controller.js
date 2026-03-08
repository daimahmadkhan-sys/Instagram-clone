const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      massege: "token not provided, Unauthorized access",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      massege: "Temper token , Unauthorized access!",
    });
  }
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "Insta-clone/posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    massege: "Post created successfully",
    post,
  });
}

async function getPostsController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      massege: "Unauthorized access!",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      massege: "Tempered token , Unauthorized access!",
    });
  }
  console.log(decoded);
  const userId = decoded.id;

  const posts = await postModel.find({ user: userId });
  console.log(posts);

  res.status(200).json({
    massege: "posts fetch successfully",
    posts,
  });
}
async function getPostDetailController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      massege: "token not found , unauthorized access",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      massege: "Unauthorized access!",
    });
  }

  const postId = req.params.postId;
  const userId = decoded.id;
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
