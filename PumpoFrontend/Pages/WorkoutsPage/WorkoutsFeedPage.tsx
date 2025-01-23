import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  GetAllExercisesInWorkoutPlan,
  GetAllWorkoutPlans,
} from "@/Services/workoutServices";
import { Ionicons } from "@expo/vector-icons";
import WorkoutCard from "./WorkoutCard";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";

const WorkoutFeedPage: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["workouts"], // Query key
      queryFn: async ({ pageParam = 1 }) => {
        const fetchedWorkouts = await GetAllWorkoutPlans(
          10,
          (pageParam - 1) * 10
        );
        return {
          workouts: fetchedWorkouts,
          nextPage: fetchedWorkouts.length === 10 ? pageParam + 1 : null,
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    });

  const workouts = data?.pages.flatMap((page) => page.workouts) || [];

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderWorkoutItem = ({ item }: { item: any }) => (
    <WorkoutCard
      workout={item}
      onPress={() => {
        router.push({
          pathname: "/(app)/(workout)/workout",
          params: { workoutId: item.workout_id },
        });
      }}
    />
  );

  return (
    <ThemedView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={workouts}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.workout_id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5} // Trigger load more when 50% from the bottom
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="large" color="#007BFF" />
            ) : null
          }
        />
      )}
    </ThemedView>
  );
};

// ------------------- Styles -------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    //paddingHorizontal: 10,
  },
});

export default WorkoutFeedPage;
