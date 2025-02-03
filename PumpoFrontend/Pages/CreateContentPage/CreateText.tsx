import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
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
import { ThemedView } from "@/components/ThemedView";
import { PostsContext } from "@/context/PostContext";
const CreateText: React.FC<{ onSubmit: (data: any) => void }> = ({
  onSubmit,
}) => {
  const [text, setText] = useState("");
  const router = useRouter();
  return (
    <View style={genericStyles.container}>
      <Text style={genericStyles.title}>Create Text Post</Text>
      <TextInput
        style={genericStyles.input}
        placeholder="Enter text..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Submit" onPress={() => onSubmit(text)} />
      <Button title="Cancel" onPress={() => router.back()} />
    </View>
  );
};
export default CreateText;
const genericStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});
