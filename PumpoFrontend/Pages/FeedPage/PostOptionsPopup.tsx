import PopupCard from "@/components/PopupCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedIcon } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const PostOptionsPopup = ({
  isOwner,
  iconName,
}: {
  isOwner: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
}) => {
  const [isPostOptionsVisible, setPostOptionsVisible] = useState(false);

  const handlePostOptionsOpen = () => setPostOptionsVisible(true);
  const handlePostOptionsClose = () => setPostOptionsVisible(false);
  return (
    <TouchableOpacity onPress={handlePostOptionsOpen}>
      <ThemedIcon name={iconName} size={24} />
      <PopupCard
        visible={isPostOptionsVisible}
        onClose={handlePostOptionsClose}
      >
        <PostOptions isOwner={isOwner} />
      </PopupCard>
    </TouchableOpacity>
  );
};

const PostOptions = ({ isOwner }: { isOwner: boolean }) => {
  const colors = {
    lightColor: styles.lightTextColor.color,
    darkColor: styles.darkTextColor.color,
  };
  return (
    <View style={styles.container}>
      {isOwner ? (
        <>
          <TouchableOpacity style={styles.option} onPress={() => {}}>
            <ThemedText {...colors} style={styles.optionThemedText}>
              Edit Post
            </ThemedText>
          </TouchableOpacity>
          <ThemedFadedView style={{ height: 1.5 }} />
          <TouchableOpacity style={styles.option} onPress={() => {}}>
            <ThemedText {...colors} style={styles.optionThemedText}>
              Delete Post
            </ThemedText>
          </TouchableOpacity>
          <ThemedFadedView style={{ height: 1.5 }} />
          <TouchableOpacity style={styles.option} onPress={() => {}}>
            <ThemedText {...colors} style={styles.optionThemedText}>
              View Insights
            </ThemedText>
          </TouchableOpacity>
          <ThemedFadedView style={{ height: 1.5 }} />
          <TouchableOpacity style={styles.option} onPress={() => {}}>
            <ThemedText {...colors} style={styles.optionThemedText}>
              Pin to Profile
            </ThemedText>
          </TouchableOpacity>
          <ThemedFadedView style={{ height: 1.5 }} />
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.option} onPress={() => {}}>
            <ThemedText {...colors} style={styles.optionThemedText}>
              Report Post
            </ThemedText>
          </TouchableOpacity>
          <ThemedFadedView style={{ height: 1.5 }} />
          <TouchableOpacity style={styles.option} onPress={() => {}}>
            <ThemedText {...colors} style={styles.optionThemedText}>
              Save Post
            </ThemedText>
          </TouchableOpacity>
          <ThemedFadedView style={{ height: 1.5 }} />
          <TouchableOpacity style={styles.option} onPress={() => {}}>
            <ThemedText {...colors} style={styles.optionThemedText}>
              Copy Link
            </ThemedText>
          </TouchableOpacity>
          <ThemedFadedView style={{ height: 1.5 }} />
          <TouchableOpacity style={styles.option} onPress={() => {}}>
            <ThemedText {...colors} style={styles.optionThemedText}>
              Share Post
            </ThemedText>
          </TouchableOpacity>
          <ThemedFadedView style={{ height: 1.5 }} />
        </>
      )}
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <ThemedText {...colors} style={styles.optionThemedText}>
          Mute User
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <ThemedText {...colors} style={styles.optionThemedText}>
          Block User
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <ThemedText {...colors} style={styles.optionThemedText}>
          Send Message
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  option: {
    paddingVertical: 15,
    //borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
  },
  optionThemedText: {
    fontSize: 16,
    //color: "#333",
  },

  lightTextColor: {
    color: "#333",
  },
  darkTextColor: {
    color: "#ccc",
  },
});

export default PostOptionsPopup;
