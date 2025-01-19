import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { AllComments } from "./CommentComponents";
import PostComponent from "./PostComponent";
import {
  AddComment,
  GetCommentTreeWithLikes,
} from "@/Services/postInteractionServices";
import { ThemedFadedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { CommentInputArea } from "../CommentPage/CommentInput";

const ExpandedPost = ({ post }: { post: DT_Post }) => {
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useAuth();
  const [commentParent, setCommentParent] = useState<DT_comment | undefined>(
    undefined
  );

  const [changed, setChanged] = useState(0);

  const handleAddComment = async () => {
    if (newComment.trim() && currentUser) {
      const commentData = {
        post_id: post.post_id,
        parent_comment_id: commentParent?.comment_id,
        user_id: currentUser.user_id,
        content: newComment,
      };
      await AddComment(commentData);
      //setChanged((prev) => prev + 1);
      setNewComment("");
      setCommentParent(undefined);
    }
  };

  return (
    <ThemedFadedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <PostComponent post={post} />
          <AllComments
            post_id={post.post_id}
            onClick={(parrentComment) => {
              setCommentParent(parrentComment);
            }}
          />
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          style={styles.keyboardAvoidingView}
        >
          <CommentInputArea
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            replyingTo={commentParent ? commentParent.username : undefined}
            onClearReplyingTo={() => {
              setCommentParent(undefined);
            }}
          />
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </ThemedFadedView>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 70, // Space for the comment input area
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

export default ExpandedPost;
