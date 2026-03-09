const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");
const express = require("express");

const userRouter = express.Router();

userRouter.post("/follow/:username", identifyUser, userController.followController);
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowController);

module.exports = userRouter;
