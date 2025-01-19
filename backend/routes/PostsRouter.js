import express from "express";
import {
  countPostsByUser,
  createPost,
  deletePost,
  filterPostsByType,
  getPopularPosts,
  getPostById,
  getPostsByDateRange,
  getPostsWithTaggedExercises,
  getPostsWithTaggedUsers,
  getTopTaggedUsers,
  lazyLoadPosts,
  searchPosts,
  updatePost,
} from "../controllers/PostsController.js";

const router = express.Router();

// Create a new post
router.post("/", createPost);

// Get a post by ID
router.get("/find/:postId", getPostById);

// Update a post
router.put("/:postId", updatePost);

// Delete a post
router.delete("/:postId", deletePost);

// Lazy load posts
router.get("/", lazyLoadPosts);

// Count posts by user
router.get("/user/:userId/count", countPostsByUser);

router.get("/search", searchPosts); // Search posts by keyword
router.get("/filter", filterPostsByType); // Filter posts by post type
router.get("/popular", getPopularPosts); // Get popular posts
router.get("/tagged-exercises", getPostsWithTaggedExercises); // Get posts with tagged exercises
router.get("/tagged-users", getPostsWithTaggedUsers); // Get posts with tagged users
router.get("/date-range", getPostsByDateRange); // Get posts by date range
router.get("/top-tagged-users", getTopTaggedUsers); // Get top tagged users
export default router;
