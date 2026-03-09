const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername == followeeUsername) {
    return res.status(200).json({
      massege: "you can not follow yourself",
    });
  }

  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExist) {
    return res.status(200).json({
      massege: "user not found",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  if (isAlreadyFollowing) {
    return res.status(200).json({
      massege: "you already following ",
      follow: isAlreadyFollowing,
    });
  }
  const followRecord = await followModel.create({
    followee: followeeUsername,
    follower: followerUsername,
  });
  res.status(200).json({
    massege: `You are now following ${followeeUsername}`,
    followRecord,
  });
}

async function unfollowController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      massege: `you are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  return res.status(200).json({
    massege: `Now you unfollow the ${followeeUsername}`,
  });
}

module.exports = { followController, unfollowController };
