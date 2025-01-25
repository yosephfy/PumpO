import {
  AddComment,
  GetCommentsByPost,
} from "@/Services/postInteractionServices";
import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { CommentInputArea } from "./CommentInput";
import Comment from "./SingleComment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CommentPage = ({ post_id }: { post_id: string }) => {
  const { currentUser } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [commentParent, setCommentParent] = useState<DT_comment | undefined>(
    undefined
  );
  const queryClient = useQueryClient();

  const { data: commentData = [] } = useQuery({
    queryKey: ["comments", post_id],
    queryFn: async () => {
      const response: DT_comment[] = await GetCommentsByPost(post_id);
      return response.filter((x) => x.parent_comment_id == undefined);
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async (commentData: {
      post_id?: string;
      parent_comment_id?: string;
      user_id: string;
      content: string;
    }) => AddComment(commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", post_id] });
      queryClient.invalidateQueries({ queryKey: ["subComments"] });
      setNewComment("");
      setCommentParent(undefined);
    },
  });

  const handleAddComment = () => {
    if (newComment.trim() && currentUser) {
      const commentData = {
        post_id: post_id,
        parent_comment_id: commentParent?.parent_comment_id
          ? commentParent?.parent_comment_id
          : commentParent?.comment_id,
        user_id: currentUser.user_id,
        content: commentParent
          ? `@${commentParent.username} ${newComment}`
          : newComment,
      };
      addCommentMutation.mutate(commentData);
    }
  };

  return (
    <ThemedFadedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.containerHeader}>
            <ThemedText>Comments</ThemedText>
          </View>
          <ThemedView
            style={{ height: 1, width: "90%", alignSelf: "center" }}
            lightColor="#ddd"
          />
          <FlatList
            data={commentData}
            renderItem={({ item }) => (
              <Comment
                key={item.comment_id}
                comment={item}
                onClick={setCommentParent}
              />
            )}
            keyExtractor={(item) => item.comment_id}
            showsVerticalScrollIndicator={false}
            style={styles.commentsList}
          />
        </SafeAreaView>
        <ThemedView>
          <CommentInputArea
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            replyingTo={commentParent ? commentParent.username : undefined}
            onClearReplyingTo={() => {
              setCommentParent(undefined);
            }}
          />
        </ThemedView>
      </KeyboardAvoidingView>
    </ThemedFadedView>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    alignItems: "center",
    padding: 20,
  },
  commentsList: {
    paddingHorizontal: 10,
    marginBottom: 0,
    flex: 1,
  },
});

export default CommentPage;
