import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import WorkoutFeedPage from "@/Pages/WorkoutsPage/WorkoutsFeedPage";
import SingleWorkoutPage from "@/Pages/WorkoutsPage/SingleWorkoutPage";

const WorkoutIndex: React.FC = () => {
  const router = useRouter();

  return <SingleWorkoutPage />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default WorkoutIndex;
