import React from "react";
import { View, StyleSheet, StyleProp, TextStyle } from "react-native";
import { ThemedText, type ThemedTextProps } from "./ThemedText";
import { parseSpecialString } from "@/utility/utilities";

export type ThemedSpecialTextProps = {
  text: string | null | undefined;
  themedTextProps?: ThemedTextProps;
  textStyle?: StyleProp<TextStyle>;
  stylesByType?: {
    [key in "text" | "hashtag" | "mention" | "custom"]?: ThemedTextProps;
  };
};

export const ThemedSpecialText: React.FC<ThemedSpecialTextProps> = ({
  text,
  themedTextProps = {},
  stylesByType = {},
  textStyle,
}) => {
  const { segments } = parseSpecialString(text || "");

  return (
    <View style={styles.container}>
      {segments.map((segment, index) => (
        <ThemedText
          key={index}
          style={[textStyle]}
          {...themedTextProps}
          {...stylesByType[segment.type]}
          type={
            segment.type === "hashtag" || segment.type === "mention"
              ? "link"
              : themedTextProps.type
          }
        >
          {segment.value + " "}
        </ThemedText>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
