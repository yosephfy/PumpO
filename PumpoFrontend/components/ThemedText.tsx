import React, { forwardRef } from "react";
import {
  Text,
  type TextProps,
  TextInput,
  type TextInputProps,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { parseSpecialString } from "@/utility/utilities";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "faded"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link";
};

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  borderWidth?: number;
  borderLightColor?: string;
  borderDarkColor?: string;
  maxLengthShowLabel?: boolean;
  type?:
    | "default"
    | "faded"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link";
};

export const ThemedText = forwardRef<Text, ThemedTextProps>(
  ({ style, lightColor, darkColor, type = "default", ...rest }, ref) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return (
      <Text
        ref={ref}
        style={[
          { color },
          type === "faded" ? styles.faded : undefined,
          type === "default" ? styles.default : undefined,
          type === "title" ? styles.title : undefined,
          type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          type === "link" ? styles.link : undefined,
          style,
        ]}
        {...rest}
      />
    );
  }
);

export const ThemedTextInput = forwardRef<TextInput, ThemedTextInputProps>(
  (
    {
      style,
      lightColor,
      darkColor,
      borderWidth = 0,
      borderDarkColor = lightColor,
      borderLightColor = darkColor,
      maxLengthShowLabel = false,
      maxLength,
      value,
      type = "default",
      ...rest
    },
    ref
  ) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    const borderColor = useThemeColor(
      { light: borderLightColor, dark: borderDarkColor },
      "text"
    );

    return (
      <View style={{ width: "100%" }}>
        <TextInput
          ref={ref}
          style={[
            { color },
            type === "faded" ? styles.faded : undefined,
            type === "default" ? styles.default : undefined,
            type === "title" ? styles.title : undefined,
            type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
            type === "subtitle" ? styles.subtitle : undefined,
            type === "link" ? styles.link : undefined,
            { borderWidth, borderColor },
            style,
          ]}
          maxLength={maxLength}
          value={value}
          {...rest}
        />
        {maxLengthShowLabel && (
          <View style={{ position: "absolute", bottom: 30, right: 20 }}>
            <ThemedText>
              {maxLength ? value?.length || 0 : ""}/{maxLength}
            </ThemedText>
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    color: "#007BFF",
  },
  faded: {
    fontSize: 16,
  },
});
