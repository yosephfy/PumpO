import express from "express";
import {
  getUserById,
  getUserByUsername,
  getUserByEmail,
  updateUser,
  getUsers,
  getUserFollowers,
  getUserFollowed,
  getUserFriendRequests,
  followUser,
  unfollowUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/findById/:userId", getUserById);
router.get("/findByUsername/:username", getUserByUsername);
router.get("/findbyEmail/:email", getUserByEmail);

router.put("/update", updateUser);

router.get("/followers/:userId", getUserFollowers);
router.get("/followed/:userId", getUserFollowed);
router.post("/follow/:followedId", followUser);
router.delete("/unfollow/:followedId", unfollowUser);

router.get("/friendRequests", getUserFriendRequests);

export default router;
