import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { GetExerciseById } from "@/Services/exerciseServices";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { ThemedText } from "@/components/ThemedText";
import { ThemedIcon, ThemedView } from "@/components/ThemedView";

const ExerciseDetailPage = ({ exerciseId }: { exerciseId: string }) => {
  const route = useRoute();

  const [exercise, setExercise] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        setLoading(true);
        const exerciseData = await GetExerciseById(exerciseId);
        setExercise(exerciseData);
      } catch (error) {
        console.error("Error fetching exercise details:", error);
        Alert.alert("Error", "Failed to load exercise details.");
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseDetails();
  }, [exerciseId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!exercise) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Exercise not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Exercise Header */}
      <View style={styles.header}>
        <ThemedText style={styles.title} darkColor="#d3d8df">
          {exercise.name}
        </ThemedText>
        <ThemedText style={styles.category}>
          {exercise.category || "General"}
        </ThemedText>
        <View style={styles.media}>
          <Video
            source={{
              uri: exercise.video_url || "",
            }}
            style={styles.video}
          />
          <Image
            source={{
              uri: exercise.image_url || "https://placehold.co/600x400.png",
            }}
            style={styles.image}
          />
        </View>
      </View>

      {/* Exercise Details */}
      <View style={styles.details}>
        <ThemedText style={styles.description} darkColor="#b6bfc9">
          {exercise.description || "No description available."}
        </ThemedText>

        <ThemedText style={styles.sectionTitle} darkColor="#d3d8df">
          Muscles Targeted
        </ThemedText>
        <ThemedText style={styles.detailsText} darkColor="#b6bfc9">
          {exercise.muscles_targeted
            ? exercise.muscles_targeted.join(", ")
            : "N/A"}
        </ThemedText>

        <ThemedText style={styles.sectionTitle} darkColor="#d3d8df">
          Equipment Required
        </ThemedText>
        <ThemedText style={styles.detailsText} darkColor="#b6bfc9">
          {exercise.equipment_required
            ? exercise.equipment_required.join(", ")
            : "None"}
        </ThemedText>

        <ThemedText style={styles.sectionTitle} darkColor="#d3d8df">
          Tags
        </ThemedText>
        <ThemedText style={styles.detailsText} darkColor="#b6bfc9">
          {exercise.tags ? exercise.tags.join(", ") : "None"}
        </ThemedText>

        <ThemedText style={styles.sectionTitle} darkColor="#d3d8df">
          Instructions
        </ThemedText>
        <ThemedText style={styles.detailsText} darkColor="#b6bfc9">
          {exercise.instructions || "No instructions provided."}
        </ThemedText>
      </View>
      <ThemedView
        style={{ height: 0.5, marginVertical: 10 }}
        darkColor="#333"
        lightColor="#d3dbe4"
      />
      {/* Interaction Buttons */}
      <View style={styles.interactions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => Alert.alert("Bookmark", "Exercise bookmarked!")}
        >
          <ThemedIcon name="bookmark-outline" size={24} />
          <ThemedText style={styles.iconButtonText}>Bookmark</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => Alert.alert("Share", "Exercise shared!")}
        >
          <ThemedIcon name="share-outline" size={24} />
          <ThemedText style={styles.iconButtonText}>Share</ThemedText>
        </TouchableOpacity>
      </View>
      <ThemedView
        style={{ height: 0.5, marginVertical: 10 }}
        darkColor="#333"
        lightColor="#d3dbe4"
      />
    </ScrollView>
  );
};

// ------------------- Styles -------------------

const styles = StyleSheet.create({
  container: {
    height: 600,
    //flex: 1,
    //backgroundColor: "#fff",
    paddingVertical: 10,
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
    textAlign: "center",
    marginVertical: 10,
  },
  category: {
    fontSize: 14,
    color: "#007BFF",
    marginBottom: 10,
  },
  media: {
    width: "100%",
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "grey",
  },
  image: {
    position: "absolute",
    bottom: 5,
    left: 5,
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: "#929fb1",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "grey",
  },
  details: {
    //paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    //color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    //color: "#555",
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 14,
    //color: "#666",
    marginBottom: 20,
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
  metaContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  metaText: {
    fontSize: 12,
    //color: "#777",
    marginBottom: 5,
  },
});

export default ExerciseDetailPage;
