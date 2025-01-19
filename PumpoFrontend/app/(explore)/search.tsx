import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ExploreIndex: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Search</Text>
    </View>
  );
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

export default ExploreIndex;
