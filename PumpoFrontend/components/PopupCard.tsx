import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type PopupCardProps = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const PopupCard: React.FC<PopupCardProps> = ({
  visible,
  onClose,
  children,
  style,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={styles.overlay}
      >
        <ThemedView style={[styles.card, style]}>
          <View style={styles.content}>{children}</View>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <ThemedText style={styles.cancelText} type="link">
              Cancel
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    //backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    //height: "80%",
  },
  topBar: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    height: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 12,
  },
  content: { paddingHorizontal: 20 },
  cancelButton: {
    paddingVertical: 15,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    //color: "#007BFF",
  },
});

export default PopupCard;
