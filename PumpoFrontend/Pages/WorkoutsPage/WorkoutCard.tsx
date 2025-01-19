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
import {
  ThemedFadedView,
  ThemedIcon,
  ThemedView,
} from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
// ------------------- WorkoutCard Component -------------------

const WorkoutCard: React.FC<{ workout: any; onPress: () => void }> = ({
  workout,
  onPress,
}) => {
  const [exercises, setExercises] = useState([]);
  const fetchExercises = async () => {
    const exercises = await GetAllExercisesInWorkoutPlan(workout.workout_id);
    setExercises(exercises);
  };

  useEffect(() => {
    fetchExercises();
  }, [workout]);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <ThemedFadedView style={styles.cardBody}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <ThemedText style={styles.cardTitle} darkColor="#d3d8df">
            {workout.name}
          </ThemedText>
          <ThemedText style={styles.cardTag} type="link">
            {workout.tags?.join(", ") || "General"}
          </ThemedText>
        </View>

        {/* Image */}
        <Image
          source={{
            uri: workout.image_url || "https://via.placeholder.com/150",
          }}
          style={styles.cardImage}
        />

        {/* Details */}
        <View style={styles.cardDetails}>
          <ThemedText
            style={styles.cardDescription}
            numberOfLines={2}
            darkColor="#b6bfc9"
          >
            {workout.description || "No description available."}
          </ThemedText>
          <ThemedText style={styles.cardInfo} darkColor="#b6bfc9">
            Duration: {workout.duration_minutes || 0} min •{" "}
            {exercises?.length || "N/A"} Exercises
          </ThemedText>
        </View>

        {/* Interactions */}
        <ThemedView style={{ height: 1 }} />
        <View style={styles.cardInteractions}>
          <TouchableOpacity>
            <ThemedIcon name="heart-outline" size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <ThemedIcon name="bookmark-outline" size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <ThemedIcon name="share-outline" size={20} />
          </TouchableOpacity>
        </View>
      </ThemedFadedView>
    </TouchableOpacity>
  );
};

// ------------------- Styles -------------------

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2, // Shadow for Android

    shadowColor: "#000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardBody: {
    marginHorizontal: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    //color: "#333",
  },
  cardTag: {
    fontSize: 12,
    //color: "#007BFF",
    fontWeight: "bold",
  },
  cardImage: {
    width: "100%",
    height: 150,
    //backgroundColor: "#ddd",
  },
  cardDetails: {
    padding: 10,
  },
  cardDescription: {
    fontSize: 14,
    //color: "#666",
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 12,
    //color: "#999",
  },
  cardInteractions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    //borderTopWidth: 1,
    //borderTopColor: "#ddd",
  },
});

export default WorkoutCard;
