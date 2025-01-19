import express from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFollowerAndFollowingCounts,
  checkIfUserFollows,
} from "../controllers/FollowersController.js";

const router = express.Router();

// Follow a user
router.post("/follow", followUser);

// Unfollow a user
router.post("/unfollow", unfollowUser);

// Get followers of a user
router.get("/:userId/followers", getFollowers);

// Get users a person is following
router.get("/:userId/following", getFollowing);

// Get follower and following counts
router.get("/:userId/counts", getFollowerAndFollowingCounts);

// Check if one user follows another
router.get("/check", checkIfUserFollows);

export default router;
