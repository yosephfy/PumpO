import { LazyLoadPosts } from "./postServices";
import {
  getRequest,
  postRequest,
  deleteRequest,
} from "/Users/yosephmas/Desktop/PumpO/PumpoFrontend/utility/axios";

const API_BASE_URL = "http://localhost:8080/app"; // Replace with your API base URL
const MAX_COMMENTS = 10; // Maximum number of top-level comments per post
const MAX_SUBCOMMENTS = 7; // Maximum number of subcomments per comment
const USERS = Array.from({ length: 1001 }, (_, i) => i + 1); // List of user IDs to randomly assign comments

// Helper function to get a random user ID
const getRandomUser = () => USERS[Math.floor(Math.random() * USERS.length)];

// Helper function to generate random content
const generateRandomContent = () => {
  const phrases = [
    "Great post!",
    "Thanks for sharing!",
    "I found this really helpful.",
    "Interesting perspective.",
    "I totally agree!",
    "This is awesome!",
    "Keep it up!",
    "Nice work!",
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
};

// Function to add a random number of comments and subcomments to a post
const addCommentsToPost = async (postId: any) => {
  try {
    // Add top-level comments
    const numComments = Math.floor(Math.random() * MAX_COMMENTS) + 1;
    for (let i = 0; i < numComments; i++) {
      const topComment = {
        post_id: postId,
        parent_comment_id: null,
        user_id: getRandomUser(),
        content: generateRandomContent(),
      };

      const topCommentResponse = await postRequest(
        `${API_BASE_URL}/interactions/comments`,
        topComment
      );

      console.log(`Added top-level comment: ${topCommentResponse}`);

      // Add subcomments for the top-level comment
      const numSubcomments = Math.floor(Math.random() * MAX_SUBCOMMENTS) + 1;
      for (let j = 0; j < numSubcomments; j++) {
        const subComment = {
          post_id: postId,
          parent_comment_id: topCommentResponse.comment_id, // Use the created comment ID
          user_id: getRandomUser(),
          content: generateRandomContent(),
        };

        const subCommentResponse = await postRequest(
          `${API_BASE_URL}/interactions/comments`,
          subComment
        );
        console.log(`Added subcomment: ${subCommentResponse}`);
      }
    }
  } catch (error: any) {
    console.error(`Error adding comments to post ${postId}:`, error.message);
  }
};

// Main function to add comments to all posts
export const addCommentsToAllPosts = async () => {
  try {
    // Fetch all posts
    const posts: DT_Post[] = await LazyLoadPosts({ limit: 10000, page: 1 });

    // Iterate over each post and add comments
    for (const post of posts) {
      console.log(`Adding comments to post ID: ${post.post_id}`);
      await addCommentsToPost(post.post_id);
    }

    console.log("Finished adding comments to all posts.");
  } catch (error: any) {
    console.error("Error fetching posts:", error.message);
  }
};
