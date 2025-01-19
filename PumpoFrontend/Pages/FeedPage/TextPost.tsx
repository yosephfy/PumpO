import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

const TextPost = ({ post }: { post: DT_Post }) => {
  return (
    <ThemedFadedView style={styles.postContent}>
      {/* Description */}
      <ThemedView style={styles.card}>
        <ThemedText style={styles.description}>{post.description}</ThemedText>
      </ThemedView>
    </ThemedFadedView>
  );
};

const styles = StyleSheet.create({
  postContent: {
    padding: 12,
    //backgroundColor: "#fff",
  },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  description: {
    fontSize: 18,
    //color: "#555",
    marginBottom: 10,
  },
});

export default TextPost;
