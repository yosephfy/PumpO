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

const WorkoutFeedPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchWorkouts = async (pageToFetch: number) => {
    if (loading || !hasMore) return; // Prevent duplicate requests
    setLoading(true);
    try {
      const fetchedWorkouts = await GetAllWorkoutPlans(
        10,
        (pageToFetch - 1) * 10
      );
      if (fetchedWorkouts.length < 10) {
        setHasMore(false); // No more data to load
      }

      setWorkouts((prevWorkouts) => [...prevWorkouts, ...fetchedWorkouts]);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts(1); // Initial fetch
  }, []);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchWorkouts(nextPage);
        return nextPage;
      });
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
      <FlatList
        data={workouts}
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.workout_id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Trigger load more when 50% from the bottom
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#007BFF" /> : null
        }
      />
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
