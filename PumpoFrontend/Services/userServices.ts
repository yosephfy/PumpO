import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "@/utility/axios";

// Fetch a user's profile by user ID
export const GetUserProfile = async (userId: string) => {
  try {
    const response = await getRequest(`/users/${userId}`);
    return response; // Assuming the API returns user profile data
  } catch (error: any) {
    console.error("Error fetching user profile:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user profile"
    );
  }
};

// Fetch a user's profile by username
export const GetUserProfileByUsername = async (username: string) => {
  try {
    const response = await getRequest(`/users/username/${username}`);
    return response; // Assuming the API returns user profile data
  } catch (error: any) {
    console.error("Error fetching user profile:", error.response || error);
    return undefined;
  }
};

// Fetch a user's profile by username
export const GetUserProfilesByUsernameList = async (usernames: string[]) => {
  const p = usernames.map((x) => {
    try {
      const response = getRequest(`/users/username/${x}`);
      return response;
    } finally {
      return undefined;
    }
  });
  const users = await Promise.all(p);

  return users;
};
// Fetch all users
export const GetAllUsers = async () => {
  try {
    const response = await getRequest(`/users`);
    return response; // Assuming the API returns user profile data
  } catch (error: any) {
    console.error("Error fetching users:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

export const SearchUsers = async (params: {
  query: string;
  limit?: number;
  page?: number;
}) => {
  const { query, limit, page } = params;
  try {
    const response = await getRequest("/users/search", {
      query,
      limit,
      page,
    });
    return response;
  } catch (error: any) {
    console.error("Error searching users:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to search for users"
    );
  }
};

// Update a user's profile
export const UpdateUserProfile = async (
  userId: string,
  profileData: object
) => {
  try {
    const response = await putRequest(`/users/${userId}`, profileData);
    return response;
  } catch (error: any) {
    console.error("Error updating user profile:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to update user profile"
    );
  }
};

// Fetch a user's fitness profile
export const GetUserFitnessProfile = async (userId: string) => {
  try {
    const response = await getRequest(`/fitness-profiles/${userId}`);
    return response; // Assuming the API returns fitness profile data
  } catch (error: any) {
    console.error("Error fetching fitness profile:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch fitness profile"
    );
  }
};

// Update a user's fitness profile
export const UpdateUserFitnessProfile = async (
  userId: string,
  fitnessData: object
) => {
  try {
    const response = await putRequest(
      `/fitness-profiles/${userId}`,
      fitnessData
    );
    return response;
  } catch (error: any) {
    console.error("Error updating fitness profile:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to update fitness profile"
    );
  }
};

// Follow a user
export const FollowUser = async (followerId: string, followeeId: string) => {
  try {
    const response = await postRequest(`/followers/follow`, {
      follower_id: followerId,
      followee_id: followeeId,
    });
    return response; // Assuming the API returns a confirmation or updated data
  } catch (error: any) {
    console.error("Error following user:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to follow user");
  }
};

// Unfollow a user
export const UnfollowUser = async (followerId: string, followeeId: string) => {
  try {
    const response = await postRequest(`/followers/unfollow`, {
      follower_id: followerId,
      followee_id: followeeId,
    });
    return response;
  } catch (error: any) {
    console.error("Error unfollowing user:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to unfollow user");
  }
};

// Get followers of a user
export const GetFollowers = async (userId: string) => {
  try {
    const response = await getRequest(`/followers/${userId}/followers`);
    return response;
  } catch (error: any) {
    console.error("Error fetching followers:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch followers"
    );
  }
};

// Get users a specific user is following
export const GetFollowing = async (userId: string) => {
  try {
    const response = await getRequest(`/followers/${userId}/following`);
    return response;
  } catch (error: any) {
    console.error("Error fetching following:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch following"
    );
  }
};

// Get follower / following counts
export const GetFollowCounts = async (userId: string) => {
  try {
    const response = await getRequest(`/followers/${userId}/counts`);
    return response;
  } catch (error: any) {
    console.error("Error fetching follow count:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch follow counts"
    );
  }
};

// Check if follower_id follows followee_id
export const CheckUserFollow = async (params: {
  follower_id: string;
  followee_id: string;
}) => {
  try {
    const response = await getRequest(`/followers/check`, params);
    return response.is_following;
  } catch (error: any) {
    console.error("Error checking follow status:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to check follow status"
    );
  }
};
