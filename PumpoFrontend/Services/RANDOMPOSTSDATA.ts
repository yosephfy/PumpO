import { CreatePost } from "@/Services/postServices";
import {
  AddLike,
  AddComment,
  SharePost,
  AddBookmark,
} from "@/Services/postInteractionServices";
import { GetAllUsers } from "@/Services/userServices";

/**
 * Utility function to generate a random integer between min and max (inclusive)
 */
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Utility function to generate a random media URL with random dimensions and colors
 */
const generateRandomMediaUrl = (): string => {
  const width = getRandomInt(100, 500);
  const height = getRandomInt(100, 500);
  const bgColor = Math.random().toString(16).substr(-6); // Random hex color
  const textColor = Math.random().toString(16).substr(-6); // Random hex color
  return `http://dummyimage.com/${width}x${height}.png/${bgColor}/${textColor}`;
};

/**
 * Generate random posts and interactions
 * @param numberOfPosts - Number of posts to create
 */
export const generateRandomPosts = async (numberOfPosts: number) => {
  try {
    // Fetch all users
    const users = await GetAllUsers();
    if (!users || users.length === 0) {
      console.error("No users found. Cannot create posts.");
      return;
    }

    for (let i = 0; i < numberOfPosts; i++) {
      // Randomly select a user
      const randomUser = users[getRandomInt(0, users.length - 1)];

      // Generate random post data
      const postData = {
        user_id: randomUser.user_id,
        post_type: ["Photo", "Video", "Text"][getRandomInt(0, 2)], // Random post type
        media_url: generateRandomMediaUrl(),
        tagged_users: Array.from(
          { length: getRandomInt(1, 5) }, // Tag 1-5 users
          () => users[getRandomInt(0, users.length - 1)].user_id.toString()
        ),
        tagged_exercises: Array.from(
          { length: getRandomInt(1, 5) }, // Tag 1-5 exercises
          () => getRandomInt(1, 1000).toString()
        ),
        description: `Random description #${i + 1} - ${Math.random()
          .toString(36)
          .substring(10)}`, // Random string
      };

      // Create the post
      const postResponse = await CreatePost(postData);
      const postId = postResponse.post_id; // Assuming the response includes post_id
      console.log(`Post created successfully: ${postId}`);

      // Add random likes
      const likeCount = getRandomInt(1, 20);
      for (let j = 0; j < likeCount; j++) {
        const liker = users[getRandomInt(0, users.length - 1)];
        await AddLike({ post_id: postId, user_id: liker.user_id });
      }
      console.log(`Added ${likeCount} likes to post ${postId}`);

      // Add random comments
      const commentCount = getRandomInt(1, 10);
      for (let k = 0; k < commentCount; k++) {
        const commenter = users[getRandomInt(0, users.length - 1)];
        await AddComment({
          post_id: postId,
          user_id: commenter.user_id,
          content: `Random comment #${k + 1}`,
        });
      }
      console.log(`Added ${commentCount} comments to post ${postId}`);

      // Add random shares
      const shareCount = getRandomInt(1, 5);
      for (let l = 0; l < shareCount; l++) {
        const sharer = users[getRandomInt(0, users.length - 1)];
        await SharePost({ post_id: postId, user_id: sharer.user_id });
      }
      console.log(`Added ${shareCount} shares to post ${postId}`);

      // Add a random bookmark
      const bookmarker = users[getRandomInt(0, users.length - 1)];
      await AddBookmark({ post_id: postId, user_id: bookmarker.user_id });
      console.log(
        `Added a bookmark to post ${postId} by user ${bookmarker.user_id}`
      );
    }

    console.log(
      `Successfully created ${numberOfPosts} random posts with interactions.`
    );
  } catch (error: any) {
    console.error(
      "Error generating random posts and interactions:",
      error.message
    );
  }
};
