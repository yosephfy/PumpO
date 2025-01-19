import React, { useState } from "react";
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";

type ToggleComponentProps = {
  children: React.ReactNode; // Content inside the toggleable wrapper
  onToggle?: (isToggled: boolean) => void; // Callback when toggled
  isInitiallyToggled?: boolean; // Initial toggle state
  toggleStyle?: StyleProp<ViewStyle>; // Style for the toggled state
  untoggleStyle?: StyleProp<ViewStyle>; // Style for the untoggled state
  haptics?: boolean; // Enable or disable haptic feedback
  disabled?: boolean; // Disable interaction
  onPressOut?: () => void; // Callback for onPressOut
  onPressIn?: () => void; // Callback for onPressIn
  style?: StyleProp<ViewStyle>; // General container style
};

const ToggleComponent: React.FC<ToggleComponentProps> = ({
  children,
  onToggle,
  isInitiallyToggled = false,
  toggleStyle,
  untoggleStyle,
  haptics = true,
  disabled = false,
  onPressOut,
  onPressIn,
  style,
}) => {
  const [isToggled, setIsToggled] = useState(isInitiallyToggled);

  const handleToggle = () => {
    if (disabled) return;

    const newToggleState = !isToggled;
    setIsToggled(newToggleState);

    if (haptics) {
      Haptics.selectionAsync();
    }

    if (onToggle) {
      onToggle(newToggleState);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.baseStyle, style, isToggled ? toggleStyle : untoggleStyle]}
      activeOpacity={0.7}
      onPress={handleToggle}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
      disabled={disabled}
    >
      <View>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
});

export default ToggleComponent;
