import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import React from "react";
import { View, Image, StyleSheet } from "react-native";

const PhotoPost = ({ post }: { post: DT_Photo }) => {
  return (
    <ThemedFadedView style={styles.postContent}>
      <Image
        source={{ uri: post.media_url }}
        style={styles.postImage}
        resizeMode="cover"
      />
    </ThemedFadedView>
  );
};

const styles = StyleSheet.create({
  postContent: {
    width: "100%",
  },
  postImage: {
    //width: "100%",
    aspectRatio: 1,
  },
});

export default PhotoPost;
