import PopupCard from "@/components/PopupCard";
import { ThemedText } from "@/components/ThemedText";
import {
  ThemedFadedView,
  ThemedIcon,
  ThemedView,
} from "@/components/ThemedView";
import {
  GetAllExercisesInWorkoutPlan,
  GetWorkoutPlanById,
  RemoveExerciseFromWorkoutPlan,
} from "@/Services/workoutServices";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ExerciseDetailPage from "./ExercisePage";

const SingleWorkoutPage = ({ workoutId }: { workoutId: string }) => {
  const [workout, setWorkout] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch workout details and exercises
  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        setLoading(true);

        // Fetch workout details
        const workoutData = await GetWorkoutPlanById(workoutId);
        setWorkout(workoutData);

        // Fetch exercises in the workout
        const exercisesData = await GetAllExercisesInWorkoutPlan(workoutId);
        setExercises(exercisesData);
      } catch (error) {
        console.error("Error fetching workout details:", error);
        Alert.alert("Error", "Failed to load workout details.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetails();
  }, [workoutId]);

  // Handle bookmark
  const handleBookmarkWorkout = () => {
    Alert.alert("Bookmark", "Workout bookmarked for later.");
    // Use bookmark logic here
  };

  // Handle share
  const handleShareWorkout = () => {
    Alert.alert("Share", "Workout link copied to clipboard.");
    // Use share logic here
  };

  // Handle Duplicate
  const handleDuplicateWorkout = () => {
    Alert.alert("Duplicate", "Workout link copied to clipboard.");
    // Use share logic here
  };

  const handleClickExercise = () => {};

  const handleRemoveExercise = async (exerciseId: string) => {
    try {
      await RemoveExerciseFromWorkoutPlan(workoutId, exerciseId);
      setExercises((prev) =>
        prev.filter((ex) => ex.exercise_id !== exerciseId)
      );
      Alert.alert("Success", "Exercise removed from workout.");
    } catch (error) {
      console.error("Error removing exercise:", error);
      Alert.alert("Error", "Failed to remove exercise.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!workout) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Workout not found.</Text>
      </View>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Workout Header */}
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>{workout.name}</ThemedText>
          <ThemedText style={styles.tag} type="link">
            {workout.tags?.join(", ") || "General"}
          </ThemedText>
          <Image
            source={{
              uri: workout.image_url || "https://via.placeholder.com/300",
            }}
            style={styles.image}
          />
        </ThemedView>

        {/* Workout Details */}
        <ThemedView style={styles.details}>
          <ThemedText style={styles.description}>
            {workout.description}
          </ThemedText>
          <ThemedText style={styles.duration}>
            Duration: {workout.duration_minutes || 0} minutes
          </ThemedText>
          <ThemedText style={styles.exerciseCount}>
            Exercises: {exercises.length || 0}
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ height: 1 }} lightColor="#eee" darkColor="#222" />
        {/* Interactions */}
        <ThemedView style={styles.interactions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleBookmarkWorkout}
          >
            <ThemedIcon name="bookmark-outline" size={24} />
            <ThemedText style={styles.iconButtonText}>Bookmark</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleDuplicateWorkout}
          >
            <ThemedIcon name="copy-outline" size={24} />
            <ThemedText style={styles.iconButtonText}>Duplicate</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleShareWorkout}
          >
            <ThemedIcon name="share-outline" size={24} />
            <ThemedText style={styles.iconButtonText}>Share</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Exercises List */}
        <ThemedText style={styles.sectionTitle}>Exercises</ThemedText>
        {exercises.map((exercise) => (
          <SingleExercise
            exercise={exercise}
            key={exercise.exercise_id}
            handleRemoveExercise={handleRemoveExercise}
            handleClickExercise={handleClickExercise}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const SingleExercise = ({
  exercise,
  handleRemoveExercise,
  handleClickExercise,
}: {
  exercise: any;
  handleRemoveExercise: (exerciseId: string) => any;
  handleClickExercise: () => any;
}) => {
  const [exerciseOpen, setExerciseOpen] = useState(false);

  useEffect(() => {}, [exercise]);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setExerciseOpen(true);
        }}
      >
        <ThemedFadedView
          style={[
            styles.exerciseCard,
            //{ borderWidth: 1, borderColor: "#edf0f2" },
          ]}
        >
          <View style={styles.exerciseTop}>
            <Image
              source={{
                uri: exercise.image_url || "https://via.placeholder.com/300",
              }}
              style={styles.exerciseImage}
            />
            <ThemedText style={styles.exerciseName}>{exercise.name}</ThemedText>
          </View>
          <ThemedText style={styles.exerciseDetails}>
            {exercise.description}
          </ThemedText>

          <ThemedView
            style={{ height: 0.5, marginVertical: 10 }}
            darkColor="#333"
            lightColor="#d3dbe4"
          />
          <View style={styles.exerciseDetails}>
            <ThemedText style={styles.excerciseDetailsText}>
              Sets: {exercise.sets || 0}
            </ThemedText>
            <ThemedView
              style={{ width: 0.5, height: "100%" }}
              darkColor="#333"
              lightColor="#d3dbe4"
            />
            <ThemedText style={styles.excerciseDetailsText}>
              Reps: {exercise.repetitions || 0}
            </ThemedText>
            <ThemedView
              style={{ width: 0.5, height: "100%" }}
              darkColor="#333"
              lightColor="#d3dbe4"
            />
            <ThemedText style={styles.excerciseDetailsText}>
              {exercise.rest_seconds || 0}s
            </ThemedText>
          </View>
        </ThemedFadedView>
      </TouchableOpacity>
      <PopupCard
        visible={exerciseOpen}
        style={{ width: "90%" }}
        onClose={() => {
          setExerciseOpen(false);
        }}
      >
        <ExerciseDetailPage exerciseId={exercise.exercise_id} />
      </PopupCard>
      {/* <SlidingModal
        isVisible={exerciseOpen}
        snapToPoints={[80]}
        onClose={() => {
          setExerciseOpen(false);
        }}
      >
        <ExerciseDetailPage exerciseId={exercise.exercise_id} />
      </SlidingModal> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    //backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    //color: "#333",
  },
  tag: {
    fontSize: 14,
    //color: "#007BFF",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  details: {
    paddingHorizontal: 15,
  },
  description: {
    fontSize: 16,
    //color: "#555",
    marginBottom: 5,
  },
  duration: {
    fontSize: 14,
    //color: "#777",
    marginBottom: 5,
  },
  exerciseCount: {
    fontSize: 14,
    //color: "#777",
    marginBottom: 10,
  },
  interactions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  iconButton: {
    alignItems: "center",
  },
  iconButtonText: {
    fontSize: 12,
    //color: "#333",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 10,
    //color: "#333",
  },
  exerciseCard: {
    //backgroundColor: "#f9f9f9",
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    //color: "#333",
  },
  exerciseTop: {
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  exerciseImage: { borderRadius: 5, height: 40, width: 40 },
  exerciseDetails: {
    //paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    //abackgroundColor: "pink",
  },
  excerciseDetailsText: {
    fontSize: 14,
    //color: "#555",
    flex: 1,
    textAlign: "center",
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  removeButtonText: {
    fontSize: 14,
    color: "#FF3B30",
    marginLeft: 5,
  },
});

export default SingleWorkoutPage;
