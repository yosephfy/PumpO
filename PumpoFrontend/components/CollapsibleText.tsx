import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { ThemedSpecialText } from "./ThemedSpecialText";
import { ThemedText } from "./ThemedText";
import { parseSpecialString } from "@/utility/utilities";

export type CollapsibleTextProps = {
  text?: string | null;
  maxWords: number;
  style?: StyleProp<TextStyle>;
  allowMarkup?: boolean;
};

const CollapsibleText: React.FC<CollapsibleTextProps> = ({
  text = "",
  maxWords,
  style,
  allowMarkup = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => setIsExpanded(!isExpanded);

  const { segments } = parseSpecialString(text || "");

  const truncatedText = segments
    .slice(0, isExpanded ? segments.length + 1 : maxWords)
    .map((s) => s.value)
    .join("");
  const shouldShowMore = (text || "").split(/\s+/).length > maxWords;

  return (
    <TouchableOpacity onPress={toggleText}>
      {allowMarkup ? (
        <View style={styles.container}>
          <ThemedSpecialText text={truncatedText} style={[style]} />
          {shouldShowMore && (
            <ThemedText style={styles.showMoreLessText}>
              {isExpanded ? " ...Show Less" : "...Show More"}
            </ThemedText>
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <ThemedText style={[styles.text, style]}>{truncatedText}</ThemedText>
          {shouldShowMore && (
            <ThemedText style={styles.showMoreLessText}>
              {isExpanded ? " ...Show Less" : "...Show More"}
            </ThemedText>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CollapsibleText;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    fontSize: 12,
  },
  showMoreLessText: {
    fontSize: 12,
    color: "#007BFF",
  },
});
