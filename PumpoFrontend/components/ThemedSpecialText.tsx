import React from "react";
import { View, StyleSheet, StyleProp, TextStyle, Alert } from "react-native";
import { ThemedText, type ThemedTextProps } from "./ThemedText";
import { parseSpecialString } from "@/utility/utilities";
import { router } from "expo-router";
import {
  GetUserProfile,
  GetUserProfileByUsername,
} from "@/Services/userServices";

export type SpecialTextType = "text" | "hashtag" | "mention" | "url" | "custom";

export type ThemedSpecialTextProps = {
  text?: string | null;
  themedTextProps?: ThemedTextProps;
  textStyle?: StyleProp<TextStyle>;
  stylesByType?: Partial<Record<SpecialTextType, Partial<ThemedTextProps>>>;
} & ThemedTextProps;

// Handlers for different types
const handleHashtagPress = (hashtag: string) => {
  router.push({ pathname: "/(explore)", params: { queryItem: hashtag } });
};

const handleMentionPress = async (mention: string) => {
  GetUserProfileByUsername(mention.slice(1))
    .then((res) => {
      if (res)
        if (router.canDismiss())
          router.dismissTo({
            pathname: "/(app)/(profile)",
            params: { user_id: res?.user_id },
          });
        else
          router.push({
            pathname: "/(app)/(profile)",
            params: { user_id: res?.user_id },
          });
    })
    .catch((err) => {});
};

const handleUrlPress = (url: string) => {
  // Open URL using Linking (if needed)
  //router.push({ pathname: "/(webview)", params: { url } });
};

const handleCustomPress = (customText: string) => {
  //router.push({ pathname: "/(custom)", params: { value: customText } });
};

export const ThemedSpecialText: React.FC<ThemedSpecialTextProps> = ({
  text = "",
  themedTextProps = {},
  stylesByType = {},
  textStyle,
  ...rest
}) => {
  const { segments } = parseSpecialString(text || "");

  return (
    <View style={styles.container}>
      {segments.map(({ type, value }, index) => {
        let onPress: (() => void) | undefined;

        // Assign specific press handlers based on type
        switch (type) {
          case "hashtag":
            onPress = () => handleHashtagPress(value);
            break;
          case "mention":
            onPress = () => handleMentionPress(value);
            break;
          case "url":
            onPress = () => handleUrlPress(value);
            break;
          case "custom":
            onPress = () => handleCustomPress(value);
            break;
          default:
            onPress = undefined; // No action for plain text
        }

        return (
          <ThemedText
            key={index}
            style={textStyle}
            {...themedTextProps}
            {...stylesByType[type]}
            type={onPress ? "link" : themedTextProps.type}
            onPress={onPress}
            suppressHighlighting={type === "text"}
            {...rest}
          >
            {value + " "}
          </ThemedText>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
