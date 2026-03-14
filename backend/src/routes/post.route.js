const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");


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

postRouter.post("/like/:postId",identifyUser,postController.likePostController)

module.exports = postRouter;
