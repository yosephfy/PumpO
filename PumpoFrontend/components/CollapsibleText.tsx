import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedSpecialText } from "./ThemedSpecialText";

type CollapsibleTextProps = {
  text: string | undefined | null;
  maxWords: number;
  style?: StyleProp<TextStyle>;
  allowMarkup?: boolean;
};

const CollapsibleText: React.FC<CollapsibleTextProps> = ({
  text,
  maxWords,
  style,
  allowMarkup = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const true_text = text ? text : "";
  const truncatedText = true_text.split(" ").slice(0, maxWords).join(" ");
  const shouldShowMore = true_text.split(" ").length > maxWords;

  return (
    <TouchableOpacity onPress={toggleText}>
      {allowMarkup ? (
        <>
          {isExpanded ? (
            <ThemedSpecialText
              text={true_text}
              textStyle={[styles.text, style]}
            />
          ) : (
            <>
              <ThemedSpecialText
                text={truncatedText}
                textStyle={[styles.text, style]}
              />
              {true_text.split(" ").length > maxWords && (
                <Text style={styles.showMoreLessText}>
                  {isExpanded ? " ...Show Less" : "...Show More"}
                </Text>
              )}
            </>
          )}
        </>
      ) : (
        <ThemedText style={[styles.text, style]}>
          {isExpanded ? text : truncatedText}
          {true_text.split(" ").length > maxWords && (
            <Text style={styles.showMoreLessText}>
              {isExpanded ? " ...Show Less" : "...Show More"}
            </Text>
          )}
        </ThemedText>
      )}
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
