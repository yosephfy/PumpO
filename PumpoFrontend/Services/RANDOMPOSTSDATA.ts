import { CreatePost, LazyLoadPosts } from "@/Services/postServices";
import {
  AddLike,
  SharePost,
  AddBookmark,
  AddComment,
} from "@/Services/postInteractionServices";
import { GetAllUsers } from "@/Services/userServices";

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomPhotoUrl = (): string => {
  const width = getRandomInt(100, 500);
  const height = getRandomInt(100, 500);
  const bgColor = Math.random().toString(16).substr(-6); // Random hex color
  const textColor = Math.random().toString(16).substr(-6); // Random hex color
  return `http://dummyimage.com/${width}x${height}.png/${bgColor}/${textColor}`;
};

export const generateRandomVideoUrl = (): string => {
  const listOfVideos = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  ];
  return listOfVideos[getRandomInt(0, listOfVideos.length - 1)];
};

const generateRandomTextContent = (): string => {
  const textSamples = [
    "This is a random text post.",
    "Another random thought!",
    "Here's something interesting to share.",
    "Life is beautiful 🌟",
    "What's your favorite workout routine?",
    "Check out this amazing content!",
    "Thoughts of the day: Stay positive!",
  ];
  return textSamples[getRandomInt(0, textSamples.length - 1)];
};

const generateRandomPostContent = (
  maxPhotos: number,
  maxVideos: number,
  maxTexts: number
): {
  photos?: { order: number; media_url: string }[];
  videos?: { order: number; media_url: string; is_pulse?: boolean }[];
  texts?: { order: number; content: string }[];
} => {
  const contentTypes = ["photos", "videos", "texts"];
  const selectedTypes = contentTypes
    .sort(() => Math.random() - 0.5)
    .slice(0, getRandomInt(1, contentTypes.length));

  const content: {
    photos?: { order: number; media_url: string }[];
    videos?: { order: number; media_url: string; is_pulse?: boolean }[];
    texts?: { order: number; content: string }[];
  } = {};

  const numPosts = getRandomInt(1, maxPhotos);
  const numVideos = getRandomInt(1, maxVideos);
  const numTexts = getRandomInt(1, maxTexts);
  const totalItems = selectedTypes.reduce(
    (sum, type) =>
      sum +
      (type === "photos" ? numPosts : type === "videos" ? numVideos : numTexts),
    0
  );

  const orderPool = Array.from({ length: totalItems }, (_, i) => i + 1).sort(
    () => Math.random() - 0.5
  );

  if (selectedTypes.includes("photos")) {
    content.photos = Array.from({ length: numPosts }, () => ({
      order: orderPool.pop() as number,
      media_url: generateRandomPhotoUrl(),
    }));
  }

  if (selectedTypes.includes("videos")) {
    content.videos = Array.from({ length: numVideos }, () => ({
      order: orderPool.pop() as number,
      media_url: generateRandomVideoUrl(),
      thumbnail_url: generateRandomPhotoUrl(),
      is_pulse: Math.random() > 0.5,
    }));
  }

  if (selectedTypes.includes("texts")) {
    content.texts = Array.from({ length: numTexts }, () => ({
      order: orderPool.pop() as number,
      content: generateRandomTextContent(),
    }));
  }

  return content;
};

const generateRandomDescription = (): string => {
  const descriptionSamples = [
    "Check out this amazing content!",
    "Loving the vibes today!",
    "Feeling inspired and motivated!",
    "Let's achieve our goals together!",
    "This post is worth sharing!",
    "Tag your friends to see this!",
    "What do you think about this?",
  ];
  return descriptionSamples[getRandomInt(0, descriptionSamples.length - 1)];
};

const generateRandomInteractions = async (
  postId: string,
  users: any[],
  maxComments: number,
  maxSubComments: number
) => {
  const numberOfLikes = getRandomInt(10, 50);
  const numberOfShares = getRandomInt(5, 20);
  const numberOfBookmarks = getRandomInt(5, 20);
  const numberOfComments = getRandomInt(10, maxComments);

  // Add likes
  for (let i = 0; i < numberOfLikes; i++) {
    const user = users[getRandomInt(0, users.length - 1)];
    await AddLike({ post_id: postId, user_id: user.user_id });
  }

  // Add shares
  for (let i = 0; i < numberOfShares; i++) {
    const user = users[getRandomInt(0, users.length - 1)];
    await SharePost({ post_id: postId, user_id: user.user_id });
  }

  // Add bookmarks
  for (let i = 0; i < numberOfBookmarks; i++) {
    const user = users[getRandomInt(0, users.length - 1)];
    await AddBookmark({ post_id: postId, user_id: user.user_id });
  }

  // Add comments and subcomments
  for (let i = 0; i < numberOfComments; i++) {
    const user = users[getRandomInt(0, users.length - 1)];
    const comment = await AddComment({
      post_id: postId,
      user_id: user.user_id,
      content: generateRandomTextContent(),
    });

    const numberOfSubComments = getRandomInt(1, maxSubComments);
    for (let j = 0; j < numberOfSubComments; j++) {
      const subUser = users[getRandomInt(0, users.length - 1)];
      await AddComment({
        post_id: postId,
        user_id: subUser.user_id,
        parent_comment_id: comment.comment_id,
        content: generateRandomTextContent(),
      });
    }
  }
};

export const generateRandomPostsAndInteractions = async ({
  numberOfPosts = 1000,
  maxPhotos = 3,
  maxVideos = 2,
  maxTexts = 2,
  maxComments = 50,
  maxSubComments = 20,
}: {
  numberOfPosts: number;
  maxPhotos: number;
  maxVideos: number;
  maxTexts: number;
  maxComments: number;
  maxSubComments: number;
}) => {
  try {
    const users = await GetAllUsers();

    if (!users || users.length === 0) {
      console.error("No users found in the database.");
      return;
    }

    for (let i = 0; i < numberOfPosts; i++) {
      const randomUser = users[getRandomInt(0, users.length - 1)];

      const postData = {
        user_id: randomUser.user_id,
        content: generateRandomPostContent(maxPhotos, maxVideos, maxTexts),
        description: generateRandomDescription(),
        tagged_users: Array.from(
          { length: getRandomInt(1, 5) },
          () => users[getRandomInt(0, users.length - 1)].user_id
        ),
      };

      try {
        const post = await CreatePost(postData);
        console.log(`Post created for user ${randomUser.username}:`, post);

        // Generate interactions for the post
        await generateRandomInteractions(
          post.post_id,
          users,
          maxComments,
          maxSubComments
        );
      } catch (error) {
        console.error("Error creating post or adding interactions:", error);
      }
    }

    console.log(
      `${numberOfPosts} random posts and interactions created successfully!`
    );
  } catch (error) {
    console.error("Error generating random posts:", error);
  }
};
