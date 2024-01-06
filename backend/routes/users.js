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
  relationshipsAdd,
  relationshipsDelete,
  friendRequestAdd,
  friendRequestDelete,
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

router.post("/relationships/add", relationshipsAdd);
router.delete("/relationships/delete", relationshipsDelete);

router.get("/friendRequests/:requestedId", getUserFriendRequests);
router.post("/friendRequests/add", friendRequestAdd);
router.delete("/friendRequests/delete", friendRequestDelete);

export default router;
