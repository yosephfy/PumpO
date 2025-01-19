import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "@/utility/axios";

// ------------------- EXERCISE SERVICES -------------------

// Create a new exercise
export const CreateExercise = async (exerciseData: {
  name: string;
  category: string;
  muscles_targeted: string[];
  equipment_required: string[];
  description?: string;
  instructions?: string;
  tags?: string[];
  video_url?: string;
  image_url?: string;
  created_by?: string;
}) => {
  try {
    const response = await postRequest("/exercises", exerciseData);
    return response;
  } catch (error: any) {
    console.error("Error creating exercise:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to create exercise"
    );
  }
};

// Get all exercises
export const GetAllExercises = async (
  limit: number = 10,
  offset: number = 0
) => {
  try {
    const response = await getRequest("/exercises", { limit, offset });
    return response;
  } catch (error: any) {
    console.error("Error fetching all exercises:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch exercises"
    );
  }
};

// Get an exercise by ID
export const GetExerciseById = async (exerciseId: string) => {
  try {
    const response = await getRequest(`/exercises/${exerciseId}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching exercise by ID:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch exercise"
    );
  }
};

// Search exercises by keyword
export const SearchExercises = async (
  keyword: string,
  limit: number = 10,
  offset: number = 0
) => {
  try {
    const response = await getRequest("/exercises/search", {
      keyword,
      limit,
      offset,
    });
    return response;
  } catch (error: any) {
    console.error("Error searching exercises:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to search exercises"
    );
  }
};

// Filter exercises by category
export const FilterExercisesByCategory = async (
  category: string,
  limit: number = 10,
  offset: number = 0
) => {
  try {
    const response = await getRequest("/exercises/filter/category", {
      category,
      limit,
      offset,
    });
    return response;
  } catch (error: any) {
    console.error(
      "Error filtering exercises by category:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to filter exercises"
    );
  }
};

// Get exercises by muscle group
export const GetExercisesByMuscleGroup = async (
  muscleGroup: string,
  limit: number = 10,
  offset: number = 0
) => {
  try {
    const response = await getRequest("/exercises/filter/muscle-group", {
      muscleGroup,
      limit,
      offset,
    });
    return response;
  } catch (error: any) {
    console.error(
      "Error fetching exercises by muscle group:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch exercises"
    );
  }
};

// Get exercises by equipment
export const GetExercisesByEquipment = async (
  equipment: string,
  limit: number = 10,
  offset: number = 0
) => {
  try {
    const response = await getRequest("/exercises/filter/equipment", {
      equipment,
      limit,
      offset,
    });
    return response;
  } catch (error: any) {
    console.error(
      "Error fetching exercises by equipment:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch exercises"
    );
  }
};

// Update an exercise
export const UpdateExercise = async (
  exerciseId: string,
  updatedData: {
    name?: string;
    category?: string;
    muscles_targeted?: string[];
    equipment_required?: string[];
    description?: string;
    instructions?: string;
    tags?: string[];
    video_url?: string;
    image_url?: string;
  }
) => {
  try {
    const response = await putRequest(`/exercises/${exerciseId}`, updatedData);
    return response;
  } catch (error: any) {
    console.error("Error updating exercise:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to update exercise"
    );
  }
};

// Delete an exercise
export const DeleteExercise = async (exerciseId: string) => {
  try {
    const response = await deleteRequest(`/exercises/${exerciseId}`);
    return response;
  } catch (error: any) {
    console.error("Error deleting exercise:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to delete exercise"
    );
  }
};

// Get popular exercises
export const GetPopularExercises = async (limit: number = 10) => {
  try {
    const response = await getRequest("/exercises/popular", { limit });
    return response;
  } catch (error: any) {
    console.error("Error fetching popular exercises:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch popular exercises"
    );
  }
};
