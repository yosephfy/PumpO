import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

type CollapsibleTextProps = {
  text: string | undefined | null;
  maxWords: number;
  style?: object;
};

const CollapsibleText: React.FC<CollapsibleTextProps> = ({
  text,
  maxWords,
  style,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const true_text = text ? text : "";
  const truncatedText = true_text.split(" ").slice(0, maxWords).join(" ");

  return (
    <TouchableOpacity onPress={toggleText}>
      <ThemedText style={[styles.text, style]}>
        {isExpanded ? text : truncatedText}
        {true_text.split(" ").length > maxWords && (
          <Text style={styles.showMoreLessText}>
            {isExpanded ? " ...Show Less" : "...Show More"}
          </Text>
        )}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    //color: "#333",
  },
  showMoreLessText: {
    fontSize: 12,
    color: "#007BFF",
  },
});

export default CollapsibleText;
