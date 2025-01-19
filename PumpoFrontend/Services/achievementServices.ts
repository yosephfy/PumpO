import { getRequest, postRequest, putRequest } from "@/utility/axios";

// Create a new achievement
export const CreateAchievement = async (achievementData: object) => {
  try {
    const response = await postRequest(`/achievements`, achievementData);
    return response;
  } catch (error: any) {
    console.error("Error creating achievement:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to create achievement"
    );
  }
};

// Get all achievements
export const GetAchievements = async () => {
  try {
    const response = await getRequest(`/achievements`);
    return response;
  } catch (error: any) {
    console.error("Error fetching achievements:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch achievements"
    );
  }
};

// Assign an achievement to a user
export const AssignAchievementToUser = async (assignmentData: {
  userId: string;
  achievementId: string;
}) => {
  try {
    const response = await postRequest(`/achievements/assign`, assignmentData);
    return response;
  } catch (error: any) {
    console.error(
      "Error assigning achievement to user:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to assign achievement to user"
    );
  }
};

// Get achievements for a specific user
export const GetUserAchievements = async (userId: string) => {
  try {
    const response = await getRequest(`/achievements/user/${userId}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching user achievements:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user achievements"
    );
  }
};

// Update user achievement progress
export const UpdateAchievementProgress = async (
  userAchievementId: string,
  progressData: object
) => {
  try {
    const response = await putRequest(
      `/achievements/progress/${userAchievementId}`,
      progressData
    );
    return response;
  } catch (error: any) {
    console.error(
      "Error updating achievement progress:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to update achievement progress"
    );
  }
};
