import SingleWorkoutPage from "@/Pages/WorkoutsPage/SingleWorkoutPage";
import { useGlobalSearchParams } from "expo-router";
import React from "react";

const WorkoutIndex: React.FC = () => {
  const params: { workoutId: string } = useGlobalSearchParams();
  if (!params.workoutId) return null;

  return (
    <SingleWorkoutPage key={params.workoutId} workoutId={params.workoutId} />
  );
};

export default WorkoutIndex;
