import ProfilePicture from "@/components/ProfilePicture";
import { ThemedText } from "@/components/ThemedText";
import ToggleIcon from "@/components/ToggleIcon";
import { useAuth } from "@/context/AuthContext";
import {
  AddLike,
  CheckIfUserLikedComment,
  GetLikesByComment,
  GetSubcomments,
  RemoveLike,
} from "@/Services/postInteractionServices";
import { timeAgo } from "@/utility/utilities";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Comment = ({
  comment,
  onClick,
}: {
  comment: DT_comment;
  onClick: (clickedComment: DT_comment) => void;
}) => {
  const { currentUser } = useAuth();
  const [changed, setChanged] = useState(0);
  const [showReplies, setShowReplies] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState(5);

  const [likedByUser, setLikedByUser] = useState<string | undefined>(undefined);
  const [numLikes, setNumLikes] = useState(0);
  const [subComments, setSubComments] = useState<DT_comment[]>([]);

  const handleViewMoreReplies = () => {
    setVisibleReplies((prev) => prev + 5);
  };

  useEffect(() => {
    const fetchCheckLike = async () => {
      if (currentUser) {
        const { like_id } = await CheckIfUserLikedComment(
          currentUser.user_id,
          comment.comment_id
        );
        setLikedByUser(like_id);
      }
    };

    const fetchLikeNumber = async () => {
      const response = await GetLikesByComment(comment.comment_id);
      setNumLikes(parseInt(response));
    };

    const fetchSubComments = async () => {
      const response = await GetSubcomments(comment.comment_id);
      setSubComments(response);
    };

    fetchCheckLike();
    fetchLikeNumber();
    fetchSubComments();
  }, [comment, currentUser, changed]);

  const handleClickLike = async (like: boolean) => {
    if (currentUser) {
      if (like) {
        await AddLike({
          user_id: currentUser.user_id,
          comment_id: comment.comment_id,
        });
      } else if (likedByUser) {
        await RemoveLike(likedByUser);
      }
      setChanged((x) => x + 1);
    }
  };

  return (
    <View style={styles.commentContainer}>
      <TouchableOpacity
        onPress={() => {
          onClick(comment);
        }}
        style={styles.commentHeader}
      >
        <ProfilePicture imageUrl={comment.profile_picture || ""} size={32} />
        <View style={styles.commentContent}>
          <ThemedText style={styles.commentHeaderText}>
            <ThemedText
              darkColor="#b9b9b9"
              type="defaultSemiBold"
              style={styles.commentUsername}
            >
              {comment.username}
            </ThemedText>
            {" · "}
            <ThemedText
              darkColor="#999"
              lightColor="#888"
              style={styles.commentTime}
            >
              {timeAgo(comment.created_at).short || "Just now"}
            </ThemedText>
          </ThemedText>
          <ThemedText
            darkColor="#aaa"
            lightColor="#333"
            style={styles.commentText}
          >
            {comment.content}
          </ThemedText>
        </View>
        <View style={styles.commentActions}>
          <ToggleIcon
            iconName="heart"
            onToggle={handleClickLike}
            isInitiallyToggled={!!likedByUser}
            style={{}}
            toggledColor="red"
            size={24}
          />
          <ThemedText
            darkColor="#b9b9b9"
            lightColor="#333"
            style={styles.likesCount}
          >
            {numLikes}
          </ThemedText>
        </View>
      </TouchableOpacity>

      {subComments.length > 0 && (
        <>
          <TouchableOpacity
            onPress={() => setShowReplies(!showReplies)}
            style={styles.viewRepliesButton}
          >
            <ThemedText type="link" style={styles.viewRepliesText}>
              {showReplies
                ? "Hide Replies"
                : `View Replies (${subComments.length})`}
            </ThemedText>
          </TouchableOpacity>
          {showReplies &&
            subComments.slice(0, visibleReplies).map((reply) => (
              <View key={reply.comment_id} style={styles.replyContainer}>
                <Comment
                  comment={reply}
                  onClick={() => {
                    onClick(reply);
                  }}
                />
              </View>
            ))}
          {showReplies && visibleReplies < subComments.length && (
            <TouchableOpacity
              onPress={handleViewMoreReplies}
              style={styles.viewRepliesButton}
            >
              <ThemedText type="link" style={styles.viewRepliesText}>
                View more replies
              </ThemedText>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  commentContainer: {
    marginBottom: 10,
    paddingVertical: 5,
    minHeight: 60,
    paddingTop: 20,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  commentHeaderText: {
    fontSize: 12,
  },
  commentUsername: {
    fontSize: 14,
  },
  commentTime: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    marginTop: 4,
  },
  commentActions: {
    marginRight: 5,
    alignItems: "center",
  },
  likesCount: {
    fontSize: 12,
  },
  viewRepliesButton: {
    marginTop: 5,
    marginLeft: 40,
  },
  viewRepliesText: {
    color: "#007BFF",
    fontSize: 12,
  },
  replyContainer: {
    marginLeft: 40,
    marginTop: 5,
  },
});
