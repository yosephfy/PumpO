import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WorkoutPost = ({ item }: any) => {
  return (
    <View style={styles.postContent}>
      <Text style={styles.title}>{item.title}</Text>
      {item.exercises.map((exercise: any, index: number) => (
        <View key={index} style={styles.exerciseContainer}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text>{`Sets: ${exercise.sets}, Reps: ${exercise.reps}`}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  postContent: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseContainer: {
    marginBottom: 8,
  },
  exerciseName: {
    fontWeight: "bold",
  },
});

export default WorkoutPost;
