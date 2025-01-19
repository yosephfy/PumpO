import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type ConversationOptionsProps = {
  onMute?: () => void;
  onBlock?: () => void;
  onReport?: () => void;
  onDelete?: () => void;
  onViewProfile?: () => void;
  onSearch?: () => void;
};

const ConversationOptions: React.FC<ConversationOptionsProps> = ({
  onMute,
  onBlock,
  onReport,
  onDelete,
  onViewProfile,
  onSearch,
}) => {
  const colors = {
    lightColor: styles.lightThemedTextColor.color,
    darkColor: styles.darkThemedTextColor.color,
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionButton} onPress={onMute}>
        <ThemedText {...colors} style={styles.optionThemedText}>
          Mute Notifications
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
      <TouchableOpacity style={styles.optionButton} onPress={onBlock}>
        <ThemedText {...colors} style={styles.optionThemedText}>
          Block User
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
      <TouchableOpacity style={styles.optionButton} onPress={onReport}>
        <ThemedText {...colors} style={styles.optionThemedText}>
          Report User
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
      <TouchableOpacity style={styles.optionButton} onPress={onSearch}>
        <ThemedText {...colors} style={styles.optionThemedText}>
          Search in Conversation
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
      <TouchableOpacity style={styles.optionButton} onPress={onViewProfile}>
        <ThemedText {...colors} style={styles.optionThemedText}>
          View Profile
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
      <TouchableOpacity style={styles.optionButton} onPress={onDelete}>
        <ThemedText
          {...colors}
          style={[styles.optionThemedText, styles.deleteThemedText]}
        >
          Delete Conversation
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  optionButton: {
    paddingVertical: 15,
    //borderBottomWidth: 1,
    //borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  optionThemedText: {
    fontSize: 16,
    //color: "#333",
  },
  deleteThemedText: {
    color: "red",
    fontWeight: "bold",
  },

  lightThemedTextColor: {
    color: "#333",
  },
  darkThemedTextColor: {
    color: "#ccc",
  },
});

export default ConversationOptions;
