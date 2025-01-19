import { getRequest, postRequest, deleteRequest } from "@/utility/axios";

// --------------------- COMMENTS ---------------------

// Add a comment or reply
export const AddComment = async (commentData: {
  post_id?: string;
  parent_comment_id?: string;
  user_id: string;
  content: string;
}) => {
  try {
    const response = await postRequest("/interactions/comments", commentData);
    return response;
  } catch (error: any) {
    console.error("Error adding comment:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to add comment");
  }
};

// Get all comments for a specific post
export const GetCommentsByPost = async (postId: string) => {
  try {
    const response = await getRequest(`/interactions/comments/post/${postId}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching comments:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch comments"
    );
  }
};

// Get all comments for a specific post
export const GetSubcomments = async (commentId: string) => {
  try {
    const response = await getRequest(
      `/interactions/comments/${commentId}/replies`
    );
    return response;
  } catch (error: any) {
    console.error("Error fetching subcomments:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch subcomments"
    );
  }
};

// Get hierarchical tree of comments and replies for a post
export const GetCommentTreeByPost = async (postId: string) => {
  try {
    const response = await getRequest(
      `/interactions/comments/post/${postId}/tree`
    );
    return response;
  } catch (error: any) {
    console.error("Error fetching comment tree:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch comment tree"
    );
  }
};

// Remove a comment
export const RemoveComment = async (commentId: string) => {
  try {
    const response = await deleteRequest(`/interactions/comments/${commentId}`);
    return response;
  } catch (error: any) {
    console.error("Error removing comment:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to remove comment"
    );
  }
};

// --------------------- LIKES ---------------------

// Add a like to a post or comment
export const AddLike = async (likeData: {
  post_id?: string;
  comment_id?: string;
  user_id: string;
}) => {
  try {
    const response = await postRequest("/interactions/likes", likeData);
    return response;
  } catch (error: any) {
    console.error("Error adding like:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to add like");
  }
};

// Get the number of likes for a post
export const GetLikesByPost = async (postId: string) => {
  try {
    const response = await getRequest(`/interactions/likes/post/${postId}`);
    return response.likes;
  } catch (error: any) {
    console.error("Error fetching likes:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to fetch likes");
  }
};

// Get the number of likes for a comment
export const GetLikesByComment = async (commentId: string) => {
  try {
    const response = await getRequest(
      `/interactions/likes/comment/${commentId}`
    );
    return response.likes;
  } catch (error: any) {
    console.error("Error fetching comment likes:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch comment likes"
    );
  }
};

// Get post likes by user
export const GetLikedPostsByUser = async (params: {
  user_id: string;
  limit: number;
  page: number;
}) => {
  try {
    const response = await getRequest(`/interactions/likes/user/post`, params);
    return response;
  } catch (error: any) {
    console.error("Error fetching liked posts:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch liked posts"
    );
  }
};

// Get post likes by user
export const GetLikedCommentssByUser = async (params: {
  user_id: string;
  limit: number;
  page: number;
}) => {
  try {
    const response = await getRequest(
      `/interactions/likes/user/comment`,
      params
    );
    return response;
  } catch (error: any) {
    console.error("Error fetching liked comments:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch liked comments"
    );
  }
};

// Remove a like
export const RemoveLike = async (likeId: string) => {
  try {
    const response = await deleteRequest(`/interactions/likes/${likeId}`);
    return response;
  } catch (error: any) {
    console.error("Error removing like:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to remove like");
  }
};

// Check if a user liked a specific post
export const CheckIfUserLikedPost = async (userId: string, postId: string) => {
  try {
    const response = await getRequest("/interactions/check-like/post", {
      userId,
      postId,
    });
    return { is_liked: response.is_liked, like_id: response.like_id };
  } catch (error: any) {
    console.error(
      "Error checking if user liked post:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to check like status for post"
    );
  }
};

// Check if a user liked a specific comment
export const CheckIfUserLikedComment = async (
  userId: string,
  commentId: string
) => {
  try {
    const response = await getRequest("/interactions/check-like/comment", {
      userId,
      commentId,
    });
    return { is_liked: response.is_liked, like_id: response.like_id };
  } catch (error: any) {
    console.error(
      "Error checking if user liked comment:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to check like status for comment"
    );
  }
};

// --------------------- SHARES ---------------------

// Share a post
export const SharePost = async (shareData: {
  post_id: string;
  user_id: string;
}) => {
  try {
    const response = await postRequest("/interactions/shares", shareData);
    return response;
  } catch (error: any) {
    console.error("Error sharing post:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to share post");
  }
};

// Get the number of shares for a specific post
export const GetSharesByPost = async (postId: string) => {
  try {
    const response = await getRequest(`/interactions/shares/post/${postId}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching shares:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to fetch shares");
  }
};

// Check if a user shared a specific post
export const CheckIfUserSharedPost = async (userId: string, postId: string) => {
  try {
    const response = await getRequest("/interactions/check-share/post", {
      userId,
      postId,
    });
    return {
      is_shared: response.is_shared,
      share_id: response.share_id,
    };
  } catch (error: any) {
    console.error(
      "Error checking if user shared post:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to check share status for post"
    );
  }
};

// --------------------- BOOKMARKS ---------------------

// Bookmark a post
export const AddBookmark = async (bookmarkData: {
  post_id: string;
  user_id: string;
}) => {
  try {
    const response = await postRequest("/interactions/bookmarks", bookmarkData);
    return response;
  } catch (error: any) {
    console.error("Error adding bookmark:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to add bookmark");
  }
};

// Get all bookmarks for a specific user
export const GetBookmarksByUser = async (userId: string) => {
  try {
    const response = await getRequest(`/interactions/bookmarks/user/${userId}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching bookmarks:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch bookmarks"
    );
  }
};

// Remove a bookmark
export const RemoveBookmark = async (bookmarkId: string) => {
  try {
    const response = await deleteRequest(
      `/interactions/bookmarks/${bookmarkId}`
    );
    return response;
  } catch (error: any) {
    console.error("Error removing bookmark:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to remove bookmark"
    );
  }
};

// Check if a user bookmarked a specific post
export const CheckIfUserBookmarkedPost = async (
  userId: string,
  postId: string
) => {
  try {
    const response = await getRequest("/interactions/check-bookmark/post", {
      userId,
      postId,
    });
    return {
      is_bookmarked: response.is_bookmarked,
      bookmark_id: response.bookmark_id,
    };
  } catch (error: any) {
    console.error(
      "Error checking if user bookmarked post:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to check bookmark status for post"
    );
  }
};

// --------------------- SUMMARY ---------------------

// Get interaction summary for a post
export const GetInteractionSummaryByPost = async (
  postId: string,
  userId?: string
) => {
  try {
    const { like_count, comment_count, bookmark_count, share_count } =
      await getRequest(`/interactions/summary/post/${postId}`);
    let userChecks = {
      like_id: undefined,
      bookmark_id: undefined,
      share_id: undefined,
    };
    if (userId) {
      const { like_id } = await CheckIfUserLikedPost(userId, postId);
      const { bookmark_id } = await CheckIfUserBookmarkedPost(userId, postId);
      const { share_id } = await CheckIfUserSharedPost(userId, postId);
      userChecks = {
        like_id: like_id,
        bookmark_id: bookmark_id,
        share_id: share_id,
      };
    }
    return {
      like_count,
      comment_count,
      bookmark_count,
      share_count,
      ...userChecks,
    };
  } catch (error: any) {
    console.error(
      "Error fetching post interaction summary:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch post interaction summary"
    );
  }
};

// Get hierarchical comments and likes

export const GetCommentTreeWithLikes = async (postId: string) => {
  try {
    // Fetch all comments for the given post
    const response = await getRequest(`/interactions/comments/post/${postId}`);

    // Create a map for storing main comments and subcomments
    const commentMap: { [key: string]: any } = {};

    // Helper function to fetch likes for a comment
    const fetchLikesForComment = async (commentId: string) => {
      try {
        const likesData = await GetLikesByComment(commentId);
        return likesData || 0;
      } catch (error) {
        console.error(`Error fetching likes for comment ${commentId}:`, error);
        return 0; // Default to 0 likes on failure
      }
    };

    // Organize comments by main and subcomments
    for (const comment of response) {
      const likesCount = await fetchLikesForComment(comment.comment_id); // Fetch likes for the comment

      const isSubcomment = comment.parent_comment_id !== null;

      if (isSubcomment) {
        // If it's a subcomment, append it to its parent
        if (commentMap[comment.parent_comment_id]) {
          commentMap[comment.parent_comment_id].subcomments.push({
            ...comment,
            likes_count: likesCount,
          });
        }
      } else {
        // If it's a main comment, initialize it with an empty subcomments array
        commentMap[comment.comment_id] = {
          ...comment,
          subcomments: [],
          likes_count: likesCount,
        };
      }
    }

    // Return the main comments as an array with nested subcomments
    const sortedComments = Object.values(commentMap).filter(
      (comment: any) => comment.parent_comment_id === null
    );

    return sortedComments;
  } catch (error: any) {
    console.error(
      "Error fetching comments with likes:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch comments with likes"
    );
  }
};
