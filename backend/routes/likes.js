import express from "express";
import {
  UnlikeComment,
  UnlikePost,
  UnlikeStory,
  addLikeOnComment,
  addLikeOnPost,
  addLikeOnStory,
  getLikesFromComment,
  getLikesFromPost,
  getLikesFromStory,
  getNumLikesFromPost,
} from "../controllers/likes.js";

const router = express.Router();

router.get("/get/post/:postId", getLikesFromPost);
router.get("/get/comment/:commentId", getLikesFromComment);
router.get("/get/story/:commentId", getLikesFromStory);

router.get("/getnum/post/:postId", getNumLikesFromPost);

router.post("/post/add", addLikeOnPost);
router.post("/comment/add", addLikeOnComment);
router.post("/story/add", addLikeOnStory);

router.delete("/post/delete/:postId", UnlikePost);
router.delete("/comment/delete/:commentId", UnlikeComment);
router.delete("/story/delete/:storyId", UnlikeStory);

export default router;
