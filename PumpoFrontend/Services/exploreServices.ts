import { getRequest } from "@/utility/axios";

/**
 * Fetch trending content across all categories.
 * @returns {Promise<any>}
 */
export const FetchTrendingContent = async (params: {
  user_id: string;
  category: "people" | "media" | "workouts" | "plans" | "all";
}): Promise<any> => {
  try {
    const response = await getRequest(`/explore/trending`);
    return response;
  } catch (error: any) {
    console.error("Error fetching trending content:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch trending content"
    );
  }
};
/**
 * Fetch suggested users based on interactions and follow recommendations.
 * @param {string} userId - The current user's ID.
 * @returns {Promise<any>}
 */
export const FetchSuggestedUsers = async (
  userId: string
): Promise<
  (DT_UserProfile & {
    follower_count: number;
    mutual_friends: string;
    mutual_friends_count: number;
  })[]
> => {
  try {
    const response = await getRequest(`/explore/people`, { userId });
    return response;
  } catch (error: any) {
    console.error("Error fetching suggested users:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch suggested users"
    );
  }
};

/**
 * Search the explore page by query and type.
 * @param {string} query - The search term.
 * @param {"people" | "workouts" | "plans" | "media" | "all"} type - The type of content to search.
 * @returns {Promise<any>}
 */
export const SearchExplore = async (params: {
  query: string;
  category?: "users" | "workouts" | "plans" | "media" | "all";
}): Promise<any> => {
  try {
    const response = await getRequest(`/explore/search`, params);
    return response || [];
  } catch (error: any) {
    console.error("Error searching explore:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to search explore content"
    );
  }
};
