import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedIcon } from "./ThemedView";

type SelectableItemProps = {
  children: React.ReactNode; // Custom component or content
  isSelected: boolean;
  onToggle: (selected: boolean) => void;
  togglePosition?: "left" | "right"; // Position of the checkbox
  style?: StyleProp<ViewStyle>;
};

const SelectableItem: React.FC<SelectableItemProps> = ({
  children,
  isSelected,
  onToggle,
  togglePosition = "right",
  style,
}) => {
  const handleToggle = () => {
    onToggle(!isSelected);
  };
  const checkboxColor = isSelected ? { color: "#007BFF" } : {};

  const checkbox = (
    <ThemedIcon
      name={isSelected ? "checkbox-outline" : "square-outline"}
      size={24}
      {...checkboxColor}
      style={styles.checkboxIcon}
    />
  );

  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={[styles.itemContainer, style]}
    >
      {togglePosition === "left" && checkbox}
      <View style={styles.contentContainer}>{children}</View>
      {togglePosition === "right" && checkbox}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
  },
  checkboxIcon: {
    marginHorizontal: 8,
  },
});

export default SelectableItem;
