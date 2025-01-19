import {
  CreateWorkoutPlan,
  AddExerciseToWorkoutPlan,
  GetAllExercisesInWorkoutPlan,
  GetAllWorkoutPlans,
} from "@/Services/workoutServices";
import { GetAllExercises } from "@/Services/exerciseServices";

/**
 * Utility function to generate a random integer between min and max (inclusive)
 */
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Utility function to generate random strings
 */
const getRandomString = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from({ length }, () =>
    characters.charAt(getRandomInt(0, characters.length - 1))
  ).join("");
};

/**
 * Generate random workout plans and populate them with exercises
 * @param numberOfPlans - Number of workout plans to generate
 * @param maxExercisesPerPlan - Maximum number of exercises per workout plan
 */
export const generateRandomWorkoutPlans = async (
  numberOfPlans: number,
  maxExercisesPerPlan: number
) => {
  try {
    // Fetch all exercises to randomly select from
    const exercises = await GetAllExercises(100, 0); // Fetch up to 100 exercises
    if (exercises.length === 0) {
      console.error("No exercises available to add to workout plans.");
      return;
    }

    for (let i = 0; i < numberOfPlans; i++) {
      // Generate random workout plan data
      const workoutPlanData = {
        name: `Workout Plan ${i + 1} - ${getRandomString(5)}`,
        description: `This is a randomly generated workout plan #${i + 1}.`,
        created_by: `${getRandomInt(1, 1001)}`, // Simulate user IDs
        duration_minutes: getRandomInt(20, 90), // Random duration between 20 and 90 minutes
        tags: ["Strength", "Endurance", "Flexibility", "Balance"].slice(
          0,
          getRandomInt(1, 4)
        ), // Random subset of tags
        image_url: `http://dummyimage.com/${getRandomInt(
          200,
          400
        )}x${getRandomInt(200, 400)}.png/dddddd/000000`, // Random image URL
      };

      // Create the workout plan
      const createdWorkoutPlan = await CreateWorkoutPlan(workoutPlanData);
      const workoutId = createdWorkoutPlan.id; // Assuming response contains workout ID
      console.log(`Created workout plan: ${workoutPlanData.name}`);

      // Randomly add exercises to the workout plan
      const numberOfExercises = getRandomInt(1, maxExercisesPerPlan);
      const selectedExercises = Array.from(
        { length: numberOfExercises },
        () => exercises[getRandomInt(0, exercises.length - 1)]
      );

      for (let j = 0; j < selectedExercises.length; j++) {
        const exercise = selectedExercises[j];

        // Generate random exercise details
        const exerciseData = {
          workout_id: workoutId,
          exercise_id: exercise.exercise_id,
          sets: getRandomInt(3, 5), // 3 to 5 sets
          repetitions: getRandomInt(8, 15), // 8 to 15 reps
          rest_seconds: getRandomInt(30, 120), // 30 to 120 seconds rest
          order_index: j + 1, // Sequential order
        };

        // Add exercise to the workout plan
        await AddExerciseToWorkoutPlan(exerciseData);
        console.log(
          `Added exercise: ${exercise.name} to ${workoutPlanData.name}`
        );
      }
    }

    console.log(`Successfully created ${numberOfPlans} workout plans.`);
  } catch (error) {
    console.error("Error generating random workout plans:", error);
  }
};

/**
 * Generate workout plans with random exercises
 */
