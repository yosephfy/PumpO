import CommentPage from "@/Pages/CommentPage/CommentPage";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const Comment = () => {
  const { post_id }: { post_id: string } = useGlobalSearchParams();
  return (
    <View style={{ flex: 1 }}>
      <CommentPage post_id={post_id} />
    </View>
  );
};

export default Comment;
