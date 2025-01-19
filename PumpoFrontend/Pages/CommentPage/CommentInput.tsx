import MessageInput from "@/components/MessageInput";
import ProfilePicture from "@/components/ProfilePicture";
import { ThemedText } from "@/components/ThemedText";
import { ThemedIcon, ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export const CommentInputArea = ({
  newComment,
  setNewComment,
  handleAddComment,
  replyingTo,
  onClearReplyingTo,
  style,
}: {
  newComment: string;
  setNewComment: (text: string) => void;
  handleAddComment: () => void;
  replyingTo?: string;
  onClearReplyingTo?: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const { currentUser } = useAuth();
  return (
    <ThemedView style={style}>
      <SafeAreaView style={[styles.commentInputContainer]}>
        {replyingTo && (
          <ThemedView
            lightColor="#eee"
            darkColor="#333"
            style={styles.replyingToContainer}
          >
            <ThemedText style={styles.replyingToText}>
              Replying To:{" "}
              <Text style={{ color: "#0074BB" }}>@{replyingTo}</Text>
            </ThemedText>
            <TouchableOpacity onPress={onClearReplyingTo}>
              <ThemedIcon name="close-outline" size={24} />
            </TouchableOpacity>
          </ThemedView>
        )}
        <View style={styles.commentInputWrapper}>
          <ProfilePicture imageUrl={currentUser?.profile_picture} size={40} />
          <MessageInput
            value={newComment}
            onChangeText={setNewComment}
            onSend={handleAddComment}
            style={{ flex: 1 }}
            focusClick={!!replyingTo} // Focus the input if replying
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  commentInputContainer: {
    borderTopColor: "#ddd",
  },
  commentInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  replyingToContainer: {
    height: 40,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  replyingToText: {
    fontSize: 14,
    textAlignVertical: "center",
    fontWeight: "500",
  },
});
