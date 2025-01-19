import {
  AddComment,
  GetCommentsByPost,
} from "@/Services/postInteractionServices";
import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
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

const CommentPage = ({ post_id }: { post_id: string }) => {
  const [commentData, setCommentData] = useState<DT_comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useAuth();
  const [commentParent, setCommentParent] = useState<DT_comment | undefined>(
    undefined
  );
  const [changed, setChanged] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response: DT_comment[] = await GetCommentsByPost(post_id);
        const topLevelComments = response.filter(
          (x) => x.parent_comment_id == undefined
        );
        setCommentData(topLevelComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [post_id, changed]);

  const handleAddComment = async () => {
    if (newComment.trim() && currentUser) {
      try {
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
        await AddComment(commentData);
        setChanged((prev) => prev + 1);
        setNewComment("");
        setCommentParent(undefined);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
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
        <ThemedView
        //style={{ position: "absolute", width: "100%", bottom: 0, flex: 1 }}
        >
          <CommentInputArea
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            replyingTo={commentParent ? commentParent.username : undefined}
            onClearReplyingTo={() => {
              setCommentParent(undefined);
            }}
            //style={{ paddingBottom: 50 }}
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
