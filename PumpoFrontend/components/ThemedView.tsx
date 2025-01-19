import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Icon, IconProps } from "@expo/vector-icons/build/createIconSet";
import { Component, forwardRef } from "react";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export type ThemedIconProps = IconProps<any> & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView = forwardRef<View, ThemedViewProps>(
  ({ style, lightColor, darkColor, ...otherProps }, ref) => {
    const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "background"
    );

    return (
      <View ref={ref} style={[{ backgroundColor }, style]} {...otherProps} />
    );
  }
);

export const ThemedFadedView = forwardRef<View, ThemedViewProps>(
  ({ style, lightColor, darkColor, ...otherProps }, ref) => {
    const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "fadedBackground"
    );

    return (
      <View ref={ref} style={[{ backgroundColor }, style]} {...otherProps} />
    );
  }
);

export const ThemedIcon = forwardRef<
  Component<IconProps<any>>,
  ThemedIconProps
>(({ size, lightColor, darkColor, ...otherProps }, ref) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "icon");

  return <Ionicons ref={ref} size={size} color={color} {...otherProps} />;
});
