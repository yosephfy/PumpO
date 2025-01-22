import PopupCard from "@/components/PopupCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedIcon } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const PostOptionsPopup = ({
  isOwner,
  iconName,
  handleClickReport,
  handleClickSavePost,
  handleClickCopyLink,
  handleClickShare,
  handleClickMute,
  handleClickBlock,
  handleClickMessage,
  handleClickEdit,
  handleClickDelete,
  handleClickInsights,
  handleClickPin,
}: {
  isOwner: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  handleClickReport: () => void;
  handleClickSavePost: () => void;
  handleClickCopyLink: () => void;
  handleClickShare: () => void;
  handleClickMute: () => void;
  handleClickBlock: () => void;
  handleClickMessage: () => void;
  handleClickEdit: () => void;
  handleClickDelete: () => void;
  handleClickInsights: () => void;
  handleClickPin: () => void;
}) => {
  const [isPostOptionsVisible, setPostOptionsVisible] = useState(false);

  const handlePostOptionsOpen = () => setPostOptionsVisible(true);
  const handlePostOptionsClose = () => setPostOptionsVisible(false);
  const colors = {
    lightColor: styles.lightTextColor.color,
    darkColor: styles.darkTextColor.color,
  };
  return (
    <TouchableOpacity onPress={handlePostOptionsOpen}>
      <ThemedIcon name={iconName} size={24} />
      <PopupCard
        visible={isPostOptionsVisible}
        onClose={handlePostOptionsClose}
      >
        <View style={styles.container}>
          {isOwner ? (
            <>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  handleClickEdit();
                  handlePostOptionsClose();
                }}
              >
                <ThemedText {...colors} style={styles.optionThemedText}>
                  Edit Post
                </ThemedText>
              </TouchableOpacity>
              <ThemedFadedView style={{ height: 1.5 }} />
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  handleClickDelete();
                  handlePostOptionsClose();
                }}
              >
                <ThemedText {...colors} style={styles.optionThemedText}>
                  Delete Post
                </ThemedText>
              </TouchableOpacity>
              <ThemedFadedView style={{ height: 1.5 }} />
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  handleClickInsights();
                  handlePostOptionsClose();
                }}
              >
                <ThemedText {...colors} style={styles.optionThemedText}>
                  View Insights
                </ThemedText>
              </TouchableOpacity>
              <ThemedFadedView style={{ height: 1.5 }} />
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  handleClickPin();
                  handlePostOptionsClose();
                }}
              >
                <ThemedText {...colors} style={styles.optionThemedText}>
                  Pin to Profile
                </ThemedText>
              </TouchableOpacity>
              <ThemedFadedView style={{ height: 1.5 }} />
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  handleClickReport();
                  handlePostOptionsClose();
                }}
              >
                <ThemedText {...colors} style={styles.optionThemedText}>
                  Report Post
                </ThemedText>
              </TouchableOpacity>
              <ThemedFadedView style={{ height: 1.5 }} />
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  handleClickSavePost();
                  handlePostOptionsClose();
                }}
              >
                <ThemedText {...colors} style={styles.optionThemedText}>
                  Save Post
                </ThemedText>
              </TouchableOpacity>
              <ThemedFadedView style={{ height: 1.5 }} />
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  handleClickCopyLink();
                  handlePostOptionsClose();
                }}
              >
                <ThemedText {...colors} style={styles.optionThemedText}>
                  Copy Link
                </ThemedText>
              </TouchableOpacity>
              <ThemedFadedView style={{ height: 1.5 }} />
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  handleClickShare();
                  handlePostOptionsClose();
                }}
              >
                <ThemedText {...colors} style={styles.optionThemedText}>
                  Share Post
                </ThemedText>
              </TouchableOpacity>
              <ThemedFadedView style={{ height: 1.5 }} />
            </>
          )}
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              handleClickMute();
              handlePostOptionsClose();
            }}
          >
            <ThemedText {...colors} style={styles.optionThemedText}>
              Mute User
            </ThemedText>
          </TouchableOpacity>
          <ThemedFadedView style={{ height: 1.5 }} />
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              handleClickBlock();
              handlePostOptionsClose();
            }}
          >
            <ThemedText {...colors} style={styles.optionThemedText}>
              Block User
            </ThemedText>
          </TouchableOpacity>
          <ThemedFadedView style={{ height: 1.5 }} />
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              handleClickMessage();
              handlePostOptionsClose();
            }}
          >
            <ThemedText {...colors} style={styles.optionThemedText}>
              Send Message
            </ThemedText>
          </TouchableOpacity>
          <ThemedFadedView style={{ height: 1.5 }} />
        </View>
      </PopupCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  option: {
    marginVertical: 2,
    borderBottomColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
  },
  optionThemedText: {
    fontSize: 16,
  },

  lightTextColor: {
    color: "#333",
  },
  darkTextColor: {
    color: "#ccc",
  },
});

export default PostOptionsPopup;
