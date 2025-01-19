import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  type TouchableOpacityProps,
} from "react-native";
import { ThemedIcon } from "./ThemedView";
import * as Haptics from "expo-haptics";

type ToggleIconProps = {
  iconName: string;
  onToggle?: (isToggled: boolean) => void;
  isInitiallyToggled?: boolean;
  style?: StyleProp<ViewStyle>;
  toggledColor?: string;
  untoggledColor?: string;
  size?: number;
  haptics?: keyof typeof Haptics.ImpactFeedbackStyle;
};

const ToggleIcon: React.FC<ToggleIconProps & TouchableOpacityProps> = ({
  iconName,
  onToggle,
  isInitiallyToggled = false,
  style,
  toggledColor,
  untoggledColor,
  size = 24,
  haptics = undefined,
  ...rest
}) => {
  const [isToggled, setIsToggled] = useState(isInitiallyToggled);

  const handleToggle = () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);
    if (onToggle) {
      onToggle(newToggleState);
    }
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle[haptics]);
  };

  useEffect(() => {
    setIsToggled(isInitiallyToggled);
  }, [isInitiallyToggled]);

  const color = isToggled
    ? toggledColor
      ? { color: toggledColor }
      : {}
    : untoggledColor
    ? { color: untoggledColor }
    : {};

  return (
    <TouchableOpacity onPress={handleToggle} style={style} {...rest}>
      <ThemedIcon
        name={
          `${iconName}${
            isToggled ? "" : "-outline"
          }` as keyof typeof Ionicons.glyphMap
        }
        size={size}
        {...color}
      />
    </TouchableOpacity>
  );
};

export default ToggleIcon;
