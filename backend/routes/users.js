import express from "express";
import {
  addGymProfile,
  followUser,
  friendRequestAdd,
  friendRequestDelete,
  getGymProfileByUserId,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUserFollowed,
  getUserFollowers,
  getUserFriendRequests,
  getUsers,
  relationshipsAdd,
  relationshipsDelete,
  unfollowUser,
  updateGymProfile,
  updateUser,
  updateUserPassword,
  updateUserPrivateAccount,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/findById/:userId", getUserById);
router.get("/findByUsername/:username", getUserByUsername);
router.get("/findbyEmail/:email", getUserByEmail);

router.put("/update", updateUser);
router.put("/updatePrivateProfile", updateUserPrivateAccount);
router.put("/updatePassword", updateUserPassword);

router.get("/followers/:userId", getUserFollowers);
router.get("/followed/:userId", getUserFollowed);
router.post("/follow/:followedId", followUser);
router.delete("/unfollow/:followedId", unfollowUser);

router.post("/relationships/add", relationshipsAdd);
router.delete("/relationships/delete", relationshipsDelete);

router.get("/friendRequests/:requestedId", getUserFriendRequests);
router.post("/friendRequests/add", friendRequestAdd);
router.delete("/friendRequests/delete", friendRequestDelete);

router.get("/gymProfile/findByUserId/:userId", getGymProfileByUserId);
router.post("/gymProfile/add", addGymProfile);
router.put("/gymProfile/update", updateGymProfile);

export default router;
