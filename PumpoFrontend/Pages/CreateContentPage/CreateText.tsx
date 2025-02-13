import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
// Assume you have a themed view component (or replace with a normal View)
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { PostsContext } from "@/context/PostContext";
import { ThemedText, ThemedTextInput } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
const CreateText: React.FC<{ onSubmit: (data: any) => void }> = ({
  onSubmit,
}) => {
  const [text, setText] = useState("");
  const maxTextLength = 2000;
  const router = useRouter();

  return (
    <ThemedFadedView style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: "100%", height: "100%" }}>
        <KeyboardAvoidingView
          style={{ flex: 1, width: "100%", height: "100%" }}
          behavior="padding"
        >
          <View style={styles.headerContainer}>
            <ThemedText style={styles.title}>Create</ThemedText>
            <View style={styles.headerButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => router.back()}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onSubmit(text)}
              >
                <ThemedText style={styles.addButtonText}>Add</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: "100%", flex: 1, marginBottom: 30 }}>
            <ThemedTextInput
              style={styles.input}
              placeholder="Share your thoughts..."
              value={text}
              onChangeText={setText}
              multiline
              maxLength={maxTextLength}
              maxLengthShowLabel
              borderDarkColor="#444"
              borderLightColor="#ddd"
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedFadedView>
  );
};
export default CreateText;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerButtonContainer: { flexDirection: "row", gap: 15, marginRight: 10 },
  title: { fontSize: 24, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    //borderColor: "#ccc",
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    height: "95%",
    //flex: 1,
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 7,
    borderRadius: 5,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  cancelButtonText: { color: "tomato", fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "transparent",
    padding: 7,
    borderRadius: 5,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "tomato",
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  characterLength: { position: "fixed", bottom: 50, left: "70%" },
});
