import PopupCard from "@/components/PopupCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedIcon } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const ProfileOptionsPopup = ({
  iconName,
}: {
  iconName: keyof typeof Ionicons.glyphMap;
}) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);

  const handleOptionsOpen = () => setOptionsVisible(true);
  const handleOptionsClose = () => setOptionsVisible(false);
  return (
    <TouchableOpacity onPress={handleOptionsOpen}>
      <ThemedIcon name={iconName} size={24} />
      <PopupCard visible={isOptionsVisible} onClose={handleOptionsClose}>
        <ProfileOptions />
      </PopupCard>
    </TouchableOpacity>
  );
};

const ProfileOptions = () => {
  const colors = {
    lightColor: styles.lightTextColor.color,
    darkColor: styles.darkTextColor.color,
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <ThemedText {...colors} style={styles.optionText}>
          Send Message
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <ThemedText {...colors} style={styles.optionText}>
          Share Profile
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <ThemedText {...colors} style={styles.optionText}>
          Mute User
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <ThemedText {...colors} style={styles.optionText}>
          Block User
        </ThemedText>
      </TouchableOpacity>
      <ThemedFadedView style={{ height: 1.5 }} />
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <ThemedText {...colors} style={styles.optionText}>
          Report User
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
    //borderBottomColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    //color: "#E8E8E8",
  },
  lightTextColor: {
    color: "#333",
  },
  darkTextColor: {
    color: "#ccc",
  },
});

export default ProfileOptionsPopup;
