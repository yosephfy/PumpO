import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "@/utility/axios";

// ------------------ POST SERVICES ------------------
// Create a new post
export const CreatePost = async (postData: {
  user_id: string;
  content: {
    photos?: { order: number; media_url: string }[];
    videos?: { order: number; media_url: string; is_pulse?: boolean }[];
    texts?: { order: number; content: string }[];
  };
  description?: string;
  tagged_users?: string[];
}) => {
  try {
    const response = await postRequest("/posts", postData);
    return response;
  } catch (error: any) {
    console.error("Error creating post:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};

// Get a post by ID
export const GetPostById = async (postId: string) => {
  try {
    const response = await getRequest(`/posts/find/${postId}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching post by ID:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to fetch post");
  }
};

// Update a post
export const UpdatePost = async (
  postId: string,
  updatedData: {
    content: {
      photos?: { order: number; id?: string; media_url: string }[];
      videos?: {
        order: number;
        id?: string;
        media_url: string;
        is_pulse?: boolean;
      }[];
      texts?: { order: number; id?: string; content: string }[];
    };
    description?: string;
    tagged_users?: string[];
  }
) => {
  try {
    const response = await putRequest(`/posts/${postId}`, updatedData);
    return response;
  } catch (error: any) {
    console.error("Error updating post:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to update post");
  }
};

// Lazy load posts
export const LazyLoadPosts = async (params: {
  userId?: string;
  tagged_users?: string;
  page: number;
  limit: number;
}) => {
  try {
    const response: DT_Post[] = await getRequest("/posts", params);
    return response;
  } catch (error: any) {
    console.error("Error lazy loading posts:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to load posts");
  }
};

// Count posts by user
export const CountPostsByUser = async (userId: string) => {
  try {
    const response = await getRequest(`/posts/user/${userId}/count`);
    return response;
  } catch (error: any) {
    console.error("Error counting posts by user:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to count posts");
  }
};

// Search posts
export const SearchPosts = async (params: {
  keyword: string;
  limit: number;
  page: number;
}) => {
  try {
    const response = await getRequest("/posts/search", params);
    return response;
  } catch (error: any) {
    console.error("Error searching posts:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to search posts");
  }
};

// Filter posts by type
export const FilterPostsByType = async (params: {
  post_type: string;
  limit: number;
  page: number;
}) => {
  try {
    const response = await getRequest("/posts/filter", params);
    return response;
  } catch (error: any) {
    console.error("Error filtering posts by type:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to filter posts by type"
    );
  }
};

// Get popular posts
export const GetPopularPosts = async (params: {
  time_frame: string;
  limit: number;
}) => {
  try {
    const response = await getRequest("/posts/popular", params);
    return response;
  } catch (error: any) {
    console.error("Error fetching popular posts:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

// Get posts with tagged exercises
export const GetPostsWithTaggedExercises = async (params: {
  exercise_id: string;
  limit: number;
  page: number;
}) => {
  try {
    const response = await getRequest("/posts/tagged-exercises", params);
    return response;
  } catch (error: any) {
    console.error(
      "Error fetching posts with tagged exercises:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch posts with exercises"
    );
  }
};

// Get posts with tagged users
export const GetPostsWithTaggedUsers = async (params: {
  user_id: string;
  limit: number;
  page: number;
}) => {
  try {
    const response = await getRequest("/posts/tagged-users", params);
    return response;
  } catch (error: any) {
    console.error(
      "Error fetching posts with tagged users:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch posts with users"
    );
  }
};

// Get posts by date range
export const GetPostsByDateRange = async (params: {
  start_date: string;
  end_date: string;
  limit: number;
  page: number;
}) => {
  try {
    const response = await getRequest("/posts/date-range", params);
    return response;
  } catch (error: any) {
    console.error(
      "Error fetching posts by date range:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch posts by date range"
    );
  }
};

// Get top tagged users
export const GetTopTaggedUsers = async () => {
  try {
    const response = await getRequest("/posts/top-tagged-users");
    return response;
  } catch (error: any) {
    console.error("Error fetching top tagged users:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch top tagged users"
    );
  }
};

// Get pulse feed
export const GetPulseFeed = async (params: {
  page: number;
  limit: number;
  userId?: string;
}) => {
  try {
    const response = await getRequest("/posts/pulse/feed", params);
    return response;
  } catch (error: any) {
    console.error("Error fetching pulse feed:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch pulse feed"
    );
  }
};
