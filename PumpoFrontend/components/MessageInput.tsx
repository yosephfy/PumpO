import React, { useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";
import { ThemedTextInput } from "./ThemedText";

type MessageInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  style?: StyleProp<ViewStyle>;
  autoFocus?: boolean;
  focusClick?: boolean;
};

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChangeText,
  onSend,
  style,
  autoFocus = false,
  focusClick,
}) => {
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (focusClick) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [focusClick]);
  return (
    <ThemedView style={[styles.inputContainer, style]}>
      <ThemedTextInput
        ref={inputRef}
        style={styles.input}
        borderWidth={1}
        borderDarkColor="#444"
        borderLightColor="#ddd"
        placeholder="Type a message..."
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSend}
        returnKeyType="send"
        autoFocus={autoFocus}
      />
      <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        <Ionicons name="send" size={20} color="#fff" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopColor: "#ddd",
    //backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    height: 40,

    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    //backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageInput;
