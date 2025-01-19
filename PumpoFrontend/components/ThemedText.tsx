import React, { forwardRef } from "react";
import {
  Text,
  type TextProps,
  TextInput,
  type TextInputProps,
  StyleSheet,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

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
  ({ style, lightColor, darkColor, type = "default", ...rest }, ref) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return (
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
          style,
        ]}
        {...rest}
      />
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
