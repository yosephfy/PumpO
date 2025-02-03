// /create/[postType].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { PostsContext } from "@/context/PostContext";
import CreateMedia from "@/Pages/CreateContentPage/CreateMedia";
import CreateText from "@/Pages/CreateContentPage/CreateText";
import CreateWorkout from "@/Pages/CreateContentPage/CreateWorkout";

type Params = {
  postType: DT_PostType;
};

export default function CreatePostScreen() {
  const { postType }: Params = useLocalSearchParams();
  const { addPost } = useContext(PostsContext);
  const router = useRouter();

  const handleSubmit = (content: any) => {
    const newPost = {
      id: Date.now(),
      type: postType as DT_PostType,
      content,
    };
    addPost(newPost);
    router.back();
  };

  if (postType === "photo") {
    return <CreateMedia onSubmit={handleSubmit} />;
  } else if (postType === "video") {
    return <CreateMedia onSubmit={handleSubmit} />;
  } else if (postType === "text") {
    return <CreateText onSubmit={handleSubmit} />;
  } else if (postType === "workout") {
    return <CreateWorkout onSubmit={handleSubmit} />;
  } else {
    return (
      <View>
        <Text>Invalid post type.</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // You can add any additional styles here if needed.
});
