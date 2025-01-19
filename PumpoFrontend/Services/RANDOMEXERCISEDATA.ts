import { CreateExercise } from "@/Services/exerciseServices";

const muscleGroups = [
  "Chest",
  "Back",
  "Legs",
  "Arms",
  "Shoulders",
  "Core",
  "Glutes",
];

const equipmentList = [
  "Barbell",
  "Dumbbell",
  "Resistance Bands",
  "Kettlebell",
  "Bodyweight",
  "Pull-Up Bar",
  "Machine",
];

const categories = ["Strength", "Cardio", "Balance", "Flexibility"];

const tagsList = ["Beginner", "Intermediate", "Advanced", "Strength", "Power"];

const exerciseNames = [
  "Push-Up",
  "Squat",
  "Deadlift",
  "Bench Press",
  "Pull-Up",
  "Lunge",
  "Overhead Press",
  "Plank",
  "Burpee",
  "Row",
];

const descriptions = [
  "A great exercise for building upper body strength.",
  "Focuses on your legs and glutes, improving lower body power.",
  "Targets multiple muscle groups and builds strength.",
  "An effective compound movement for the chest, shoulders, and triceps.",
  "Excellent for back and bicep development.",
  "Improves lower body strength and balance.",
  "Builds shoulder strength and stability.",
  "Core-focused exercise for stability and strength.",
  "A high-intensity full-body movement.",
  "Develops pulling strength and improves posture.",
];

/**
 * Utility function to generate a random integer between min and max (inclusive)
 */
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate random exercises and populate the database
 * @param count - Number of exercises to create
 */
export const generateRandomExercises = async (count: number) => {
  try {
    for (let i = 0; i < count; i++) {
      const randomNameIndex = getRandomInt(0, exerciseNames.length - 1);

      const exerciseData = {
        name: exerciseNames[randomNameIndex],
        category: categories[getRandomInt(0, categories.length - 1)],
        muscles_targeted: Array.from(
          { length: getRandomInt(1, 3) }, // Select 1-3 muscle groups
          () => muscleGroups[getRandomInt(0, muscleGroups.length - 1)]
        ),
        equipment_required: Array.from(
          { length: getRandomInt(1, 2) }, // Select 1-2 equipment types
          () => equipmentList[getRandomInt(0, equipmentList.length - 1)]
        ),
        description: descriptions[randomNameIndex],
        instructions: `Perform the ${exerciseNames[randomNameIndex]} with proper form to avoid injuries.`,
        tags: Array.from(
          { length: getRandomInt(1, 3) }, // Select 1-3 tags
          () => tagsList[getRandomInt(0, tagsList.length - 1)]
        ),
        video_url: `http://example.com/videos/${exerciseNames[randomNameIndex]
          .toLowerCase()
          .replace(/\s/g, "-")}.mp4`,
        image_url: `http://example.com/images/${exerciseNames[randomNameIndex]
          .toLowerCase()
          .replace(/\s/g, "-")}.jpg`,
        created_by: getRandomInt(0, 1000).toString(),
      };

      const response = await CreateExercise(exerciseData);
      console.log(`Exercise created: ${response}`);
    }

    console.log(`Successfully created ${count} random exercises.`);
  } catch (error: any) {
    console.error("Error generating random exercises:", error.message);
  }
};

// Generate 50 random exercises
