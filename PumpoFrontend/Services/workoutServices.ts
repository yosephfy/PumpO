import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest,
} from "@/utility/axios";

// ------------------- WORKOUT PLAN SERVICES -------------------

// Create a new workout plan
export const CreateWorkoutPlan = async (workoutData: {
  name: string;
  description?: string;
  created_by?: string;
  duration_minutes?: number;
  tags?: string[];
  image_url?: string;
}) => {
  try {
    const response = await postRequest("/workouts", workoutData);
    return response;
  } catch (error: any) {
    console.error("Error creating workout plan:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to create workout plan"
    );
  }
};

// Get all workout plans
export const GetAllWorkoutPlans = async (
  limit: number = 10,
  offset: number = 0
) => {
  try {
    const response = await getRequest("/workouts", { limit, offset });
    return response;
  } catch (error: any) {
    console.error("Error fetching all workout plans:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch workout plans"
    );
  }
};

// Get a workout plan by ID
export const GetWorkoutPlanById = async (workoutId: string) => {
  try {
    const response = await getRequest(`/workouts/${workoutId}`);
    return response;
  } catch (error: any) {
    console.error(
      "Error fetching workout plan by ID:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch workout plan"
    );
  }
};

// Search workout plans by keyword
export const SearchWorkoutPlans = async (
  keyword: string,
  limit: number = 10,
  offset: number = 0
) => {
  try {
    const response = await getRequest("/workouts/search", {
      keyword,
      limit,
      offset,
    });
    return response;
  } catch (error: any) {
    console.error("Error searching workout plans:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to search workout plans"
    );
  }
};

// Get workout plans created by a user
export const GetWorkoutPlansByUser = async (params: {
  userId: string;
  limit: number;
  page: number;
}) => {
  try {
    const response = await getRequest(`/workouts/user`, params);
    return response;
  } catch (error: any) {
    console.error(
      "Error fetching workout plans by user:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch user's workout plans"
    );
  }
};

// Filter workout plans by duration
export const FilterWorkoutPlansByDuration = async (
  min_duration: number,
  max_duration: number,
  limit: number = 10,
  offset: number = 0
) => {
  try {
    const response = await getRequest("/workouts/filter/duration", {
      min_duration,
      max_duration,
      limit,
      offset,
    });
    return response;
  } catch (error: any) {
    console.error(
      "Error filtering workout plans by duration:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to filter workout plans"
    );
  }
};

// Update a workout plan
export const UpdateWorkoutPlan = async (
  workoutId: string,
  updatedData: {
    name?: string;
    description?: string;
    duration_minutes?: number;
    tags?: string[];
    image_url?: string;
  }
) => {
  try {
    const response = await putRequest(`/workouts/${workoutId}`, updatedData);
    return response;
  } catch (error: any) {
    console.error("Error updating workout plan:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to update workout plan"
    );
  }
};

// Delete a workout plan
export const DeleteWorkoutPlan = async (workoutId: string) => {
  try {
    const response = await deleteRequest(`/workouts/${workoutId}`);
    return response;
  } catch (error: any) {
    console.error("Error deleting workout plan:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to delete workout plan"
    );
  }
};

// Duplicate a workout plan
export const DuplicateWorkoutPlan = async (
  workoutId: string,
  userId: string
) => {
  try {
    const response = await postRequest(`/workouts/duplicate/${workoutId}`, {
      userId,
    });
    return response;
  } catch (error: any) {
    console.error("Error duplicating workout plan:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to duplicate workout plan"
    );
  }
};

// Get featured workout plans
export const GetFeaturedWorkoutPlans = async (
  limit: number = 10,
  offset: number = 0
) => {
  try {
    const response = await getRequest("/workouts/featured", { limit, offset });
    return response;
  } catch (error: any) {
    console.error(
      "Error fetching featured workout plans:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch featured workout plans"
    );
  }
};

// Get workout plans by tags
export const GetWorkoutPlansByTags = async (
  tags: string[],
  limit: number = 10,
  offset: number = 0
) => {
  try {
    const response = await getRequest("/workouts/tags", {
      tags,
      limit,
      offset,
    });
    return response;
  } catch (error: any) {
    console.error(
      "Error fetching workout plans by tags:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch workout plans by tags"
    );
  }
};

// Get recent workout plans
export const GetRecentWorkoutPlans = async (limit: number = 10) => {
  try {
    const response = await getRequest("/workouts/recent", { limit });
    return response;
  } catch (error: any) {
    console.error(
      "Error fetching recent workout plans:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch recent workout plans"
    );
  }
};

// ------------------- WORKOUT EXERCISE SERVICES -------------------

// Add an exercise to a workout plan
export const AddExerciseToWorkoutPlan = async (exerciseData: {
  workout_id: string;
  exercise_id: string;
  sets?: number;
  repetitions?: number;
  rest_seconds?: number;
  order_index?: number;
}) => {
  try {
    const response = await postRequest(
      `/workouts/${exerciseData.workout_id}/exercises`,
      exerciseData
    );
    return response;
  } catch (error: any) {
    console.error(
      "Error adding exercise to workout plan:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to add exercise to workout plan"
    );
  }
};

// Get all exercises in a workout plan
export const GetAllExercisesInWorkoutPlan = async (workoutId: string) => {
  try {
    const response = await getRequest(`/workouts/${workoutId}/exercises`);
    return response;
  } catch (error: any) {
    console.error(
      "Error fetching exercises in workout plan:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch exercises in workout plan"
    );
  }
};

// Update an exercise in a workout plan
export const UpdateExerciseInWorkoutPlan = async (
  workoutId: string,
  exerciseId: string,
  updatedData: {
    sets?: number;
    repetitions?: number;
    rest_seconds?: number;
    order_index?: number;
  }
) => {
  try {
    const response = await putRequest(
      `/workouts/${workoutId}/exercises/${exerciseId}`,
      updatedData
    );
    return response;
  } catch (error: any) {
    console.error(
      "Error updating exercise in workout plan:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to update exercise in workout plan"
    );
  }
};

// Remove an exercise from a workout plan
export const RemoveExerciseFromWorkoutPlan = async (
  workoutId: string,
  exerciseId: string
) => {
  try {
    const response = await deleteRequest(
      `/workouts/${workoutId}/exercises/${exerciseId}`
    );
    return response;
  } catch (error: any) {
    console.error(
      "Error removing exercise from workout plan:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to remove exercise from workout plan"
    );
  }
};

// Reorder exercises in a workout plan
export const ReorderExercisesInWorkoutPlan = async (
  workoutId: string,
  exerciseOrders: { exercise_id: string; order_index: number }[]
) => {
  try {
    const response = await patchRequest(
      `/workouts/${workoutId}/exercises/reorder`,
      {
        exercise_orders: exerciseOrders,
      }
    );
    return response;
  } catch (error: any) {
    console.error(
      "Error reordering exercises in workout plan:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to reorder exercises"
    );
  }
};

// Bulk add exercises to a workout plan
export const BulkAddExercisesToWorkoutPlan = async (
  workoutId: string,
  exercises: any[]
) => {
  try {
    const response = await postRequest(
      `/workouts/${workoutId}/exercises/bulk`,
      { exercises }
    );
    return response;
  } catch (error: any) {
    console.error(
      "Error bulk adding exercises to workout plan:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to bulk add exercises"
    );
  }
};

// Get total workout duration
export const GetTotalWorkoutDuration = async (workoutId: string) => {
  try {
    const response = await getRequest(`/workouts/${workoutId}/total-duration`);
    return response.total_duration_seconds;
  } catch (error: any) {
    console.error(
      "Error fetching total workout duration:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch total workout duration"
    );
  }
};

// Check if an exercise exists in a workout plan
export const CheckIfExerciseExistsInWorkoutPlan = async (
  workoutId: string,
  exerciseId: string
) => {
  try {
    const response = await getRequest(
      `/workouts/${workoutId}/exercises/${exerciseId}/exists`
    );
    return response.exists;
  } catch (error: any) {
    console.error(
      "Error checking exercise existence in workout plan:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to check exercise existence"
    );
  }
};
