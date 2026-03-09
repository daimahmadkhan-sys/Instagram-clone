const express = require("express");
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);
postRouter.get("/", identifyUser, postController.getPostsController);
postRouter.get(
  "/detail/:postId",
  identifyUser,
  postController.getPostDetailController,
);

module.exports = postRouter;
