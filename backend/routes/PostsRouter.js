import express from "express";
import {
  countPostsByUser,
  createPost,
  deletePost,
  getPopularPosts,
  getPostById,
  getPostsByDateRange,
  getPostsWithTaggedUsers,
  getPulseFeed,
  getTopTaggedUsers,
  lazyLoadPosts,
  searchPosts,
  updatePost,
} from "../controllers/PostsController.js";

const router = express.Router();

// Post Management
router.post("/", createPost); // Create a new post
router.get("/find/:postId", getPostById); // Get a post by ID
router.put("/:postId", updatePost); // Update a post
router.delete("/:postId", deletePost); // Delete a post

// Post Retrieval
router.get("/", lazyLoadPosts); // Lazy load posts
router.get("/user/:userId/count", countPostsByUser); // Count posts by user
router.get("/search", searchPosts); // Search posts by keyword
router.get("/popular", getPopularPosts); // Get popular posts
router.get("/tagged-users", getPostsWithTaggedUsers); // Get posts with tagged users
router.get("/date-range", getPostsByDateRange); // Get posts by date range
router.get("/top-tagged-users", getTopTaggedUsers); // Get top tagged users

// Pulse Feed
router.get("/pulse/feed", getPulseFeed); // Get pulse feed

export default router;
