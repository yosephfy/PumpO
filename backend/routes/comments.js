import express from "express";
import {
  addCommentOnComment,
  addCommentOnPost,
  addCommentOnStory,
  deleteCommentFromComment,
  deleteCommentFromPost,
  deleteCommentFromStory,
  getCommentsFromComment,
  getCommentsFromPost,
  getCommentsFromStory,
  getNumCommentsFromPost,
} from "../controllers/comments.js";

const router = express.Router();

router.get("/get/post/:postId", getCommentsFromPost);
router.get("/get/story/:storyId", getCommentsFromStory);
router.get("/get/comment/:commentId", getCommentsFromComment);

router.get("/getnum/:postId", getNumCommentsFromPost);

router.post("/comment/add", addCommentOnComment);
router.post("/story/add", addCommentOnStory);
router.post("/post/add", addCommentOnPost);

router.delete("/delete/post/:postId", deleteCommentFromPost);
router.delete("/delete/comment/:commentId", deleteCommentFromComment);
router.delete("/delete/story/:storyId", deleteCommentFromStory);

export default router;
