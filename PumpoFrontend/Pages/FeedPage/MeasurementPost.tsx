import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MeasurementPost = ({ item }: any) => {
  return (
    <View style={styles.postContent}>
      <Text style={styles.title}>Measurement Update</Text>
      {item.measurements.map((measurement: any, index: number) => (
        <View key={index} style={styles.measurementContainer}>
          <Text style={styles.metricName}>{measurement.metric_name}</Text>
          <Text>{`Current: ${measurement.metric_value}, Goal: ${measurement.goal_value}`}</Text>
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
  measurementContainer: {
    marginBottom: 8,
  },
  metricName: {
    fontWeight: "bold",
  },
});

export default MeasurementPost;
