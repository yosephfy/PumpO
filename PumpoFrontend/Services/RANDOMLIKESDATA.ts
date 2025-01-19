import { AddLike } from "@/Services/postInteractionServices"; // Assuming AddLike exists
import { getRequest } from "@/utility/axios"; // Import the axios instance for fetching data

/**
 * Utility function to generate random integer between min and max (inclusive)
 */
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Function to generate random likes data for posts and comments, then upload it to the database
 */
export const generateLikesData = async (numberOfLikes: number) => {
  try {
    // Fetch all posts and comments from the database
    const posts = await getRequest("/posts", { limit: 100000 });
    const comments = await getRequest("/interactions/comments/");
    const users = await getRequest("/users"); // Assuming a route to get all users exists

    if (
      !posts ||
      !users ||
      !comments ||
      posts.length === 0 ||
      users.length === 0
    ) {
      console.error(
        "No posts, users, or comments available to generate likes."
      );
      return;
    }

    for (let i = 0; i < numberOfLikes; i++) {
      // Randomly decide if the like will be for a post or a comment
      const isPostLike = Math.random() > 0.5;

      // Randomly select a post or comment
      const randomPost = posts[getRandomInt(0, posts.length - 1)];
      const randomComment = comments[getRandomInt(0, comments.length - 1)];
      const randomUser = users[getRandomInt(0, users.length - 1)];

      // Ensure the user is not liking their own post/comment
      if (
        (isPostLike && randomPost.user_id === randomUser.user_id) ||
        (!isPostLike && randomComment.user_id === randomUser.user_id)
      ) {
        continue;
      }

      // Create a like data object
      const likeData = isPostLike
        ? {
            post_id: randomPost.post_id,
            user_id: randomUser.user_id,
          }
        : {
            comment_id: randomComment.comment_id,
            user_id: randomUser.user_id,
          };

      // Upload the like to the database using AddLike service
      const response = await AddLike(likeData);

      console.log(
        `Like added successfully for ${isPostLike ? "post" : "comment"}:`,
        response
      );
    }

    console.log(`Successfully added ${numberOfLikes} likes.`);
  } catch (error: any) {
    console.error("Error generating or uploading likes data:", error.message);
  }
};
