import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

const TextPost = ({ post }: { post: DT_Text }) => {
  return (
    <ThemedFadedView style={styles.postContent}>
      {/* Description */}
      <ThemedView style={styles.card}>
        <ThemedText style={styles.description}>{post.content}</ThemedText>
      </ThemedView>
    </ThemedFadedView>
  );
};

const styles = StyleSheet.create({
  postContent: {
    padding: 12,
    width: "100%",
    //backgroundColor: "#fff",
  },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    //color: "#555",
    marginBottom: 10,
  },
});

export default TextPost;
