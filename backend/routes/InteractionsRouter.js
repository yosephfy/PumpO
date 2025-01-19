import express from "express";
import {
  addBookmark,
  addComment,
  addLike,
  checkIfUserBookmarkedPost,
  checkIfUserLikedComment,
  checkIfUserLikedPost,
  checkIfUserSharedPost,
  GetAllComments,
  getBookmarksByUser,
  getCommentsByPost,
  getCommentTreeByPost,
  getInteractionSummaryByPost,
  getInteractionSummaryByUser,
  getLikedCommentsByUser,
  getLikedPostsByUser,
  getLikesByComment,
  getLikesByPost,
  getRepliesByComment,
  getSharesByPost,
  getSharesByUser,
  removeBookmark,
  removeComment,
  removeLike,
  sharePost,
} from "../controllers/InteractionsController.js";

const router = express.Router();

// --------------------- COMMENTS ---------------------

// Add a comment or reply
router.post("/comments", addComment);

// Get all Comments
router.get("/comments", GetAllComments);

// Get all comments and replies for a post
router.get("/comments/post/:postId", getCommentsByPost);

// Remove a comment
router.delete("/comments/:commentId", removeComment);

// Get replies for a specific comment
router.get("/comments/:commentId/replies", getRepliesByComment);

// Get a hierarchical tree of comments and replies for a post
router.get("/comments/post/:postId/tree", getCommentTreeByPost);

// --------------------- LIKES ---------------------

// Add a like to a post or comment
router.post("/likes", addLike);

// Get the number of likes for a post
router.get("/likes/post/:postId", getLikesByPost);

// Get the number of likes for a comment
router.get("/likes/comment/:commentId", getLikesByComment);

// Remove a like from a post or comment
router.delete("/likes/:likeId", removeLike);

// Get all post likes by a user
router.get("/likes/user/post", getLikedPostsByUser);

// Get all comment likes by a user
router.get("/likes/user/comment", getLikedCommentsByUser);

// Check if a user liked a specific post
router.get("/check-like/post", checkIfUserLikedPost);

// Check if a user liked a specific comment
router.get("/check-like/comment", checkIfUserLikedComment);

// --------------------- SHARES ---------------------

// Share a post
router.post("/shares", sharePost);

// Get the number of shares for a specific post
router.get("/shares/post/:postId", getSharesByPost);

// Get all shares made by a user
router.get("/shares/user/:userId", getSharesByUser);

// Check if a user shared a specific post
router.get("/check-share/post", checkIfUserSharedPost);

// --------------------- BOOKMARKS ---------------------

// Bookmark a post
router.post("/bookmarks", addBookmark);

// Get all bookmarks for a specific user
router.get("/bookmarks/user/:userId", getBookmarksByUser);

// Remove a bookmark
router.delete("/bookmarks/:bookmarkId", removeBookmark);

// Check if a user bookmarked a specific post
router.get("/check-bookmark/post", checkIfUserBookmarkedPost);

// --------------------- SUMMARY ---------------------

// Get interaction summary for a post (comments, likes, shares, bookmarks)
router.get("/summary/post/:postId", getInteractionSummaryByPost);

// Get interaction summary for a user (likes, shares, bookmarks)
router.get("/summary/user/:userId", getInteractionSummaryByUser);

export default router;
