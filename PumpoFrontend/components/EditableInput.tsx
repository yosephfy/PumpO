import { Ionicons } from "@expo/vector-icons";
import React, { useState, useRef } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ThemedTextInput } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type EditableInputProps = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  iconColor?: string;
  autoFocus?: boolean;
  paragraphMode?: boolean;
  unlocked?: boolean;
};

const EditableInput: React.FC<EditableInputProps> = ({
  value,
  onChange,
  placeholder,
  containerStyle,
  inputStyle,
  iconSize = 20,
  iconColor = "#007BFF",
  autoFocus = true,
  paragraphMode = false,
  unlocked = false,
}) => {
  const [isEditable, setIsEditable] = useState(unlocked);
  const inputRef = useRef<TextInput>(null);
  const borderColor = useThemeColor(
    { light: "#ddd", dark: "#444" },
    "background"
  );
  const handleEditToggle = () => {
    setIsEditable((prev) => !prev);
    if (!isEditable && autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <View style={[styles.container, containerStyle, { borderColor }]}>
      <ThemedTextInput
        ref={inputRef}
        style={[
          styles.input,
          paragraphMode && styles.paragraphInput,
          inputStyle,
          isEditable ? styles.editable : styles.nonEditable,
        ]}
        value={value}
        onChangeText={onChange}
        editable={isEditable}
        placeholder={placeholder}
        multiline={paragraphMode}
        textAlignVertical={paragraphMode ? "top" : "center"}
      />
      <TouchableOpacity onPress={handleEditToggle} style={styles.iconContainer}>
        <Ionicons
          name={isEditable ? "checkmark-outline" : "pencil"}
          size={iconSize}
          color={iconColor}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    //backgroundColor: "#f9f9f9",
  },
  input: {
    //flex: 1,
    paddingRight: 15,
    paddingVertical: 8,
    fontSize: 14,
  },
  paragraphInput: {
    height: 100,
    textAlignVertical: "top",
  },
  editable: {
    //color: "#000",
  },
  nonEditable: {
    color: "#888",
  },
  iconContainer: {
    //marginVertical: 10,
    //backgroundColor: "pink",
    position: "absolute",
    right: 8,
    top: 8,
  },
});

export default EditableInput;
