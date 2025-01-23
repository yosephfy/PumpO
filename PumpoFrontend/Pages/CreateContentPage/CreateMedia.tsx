import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";

const CreateMedia: React.FC = () => {
  const [facing, setFacing] = useState<CameraType>("back"); // Camera direction
  const [flashMode, setFlashMode] = useState<FlashMode>("off"); // Flash mode
  const [permission, requestPermission] = useCameraPermissions(); // Permissions hook
  const cameraRef = useRef<CameraView | null>(null); // Reference to the camera

  // Ensure permissions are granted
  useEffect(() => {
    (async () => {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert(
          "Permission required",
          "Camera permission is needed to use this feature."
        );
      }
    })();
  }, []);

  if (!permission) {
    // Permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Permissions are not granted
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Toggle the camera direction
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  // Toggle flash mode
  const toggleFlashMode = () => {
    setFlashMode((current) => (current === "off" ? "on" : "off"));
  };

  // Capture an image
  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo captured:", photo?.uri);
        Alert.alert("Photo Captured", `Photo URI: ${photo?.uri}`);
        // You can navigate to a preview screen or save the photo here
      } catch (error) {
        Alert.alert("Error", "Failed to capture photo.");
      }
    } else {
      Alert.alert("Error", "Camera is not ready.");
    }
  };

  // Navigate to Gallery View (Dummy Example)
  const openGallery = () => {
    Alert.alert("Gallery", "Open your gallery or file picker here.");
    // You can replace this with your gallery component/navigation logic.
  };

  return (
    <ThemedView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        flash={flashMode}
        ref={cameraRef} // Attach the reference
      >
        <View style={styles.topControls}>
          <TouchableOpacity
            onPress={() => router.replace("/(app)")}
            style={styles.iconButton}
          >
            <Ionicons name="close-outline" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFlashMode} style={styles.iconButton}>
            <Ionicons
              name={flashMode === "off" ? "flash-off-outline" : "flash"}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={openGallery} style={styles.iconButton}>
            <Ionicons name="images-outline" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={captureImage} // Capture button functionality
          >
            {/* Capture button */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCameraFacing}
            style={styles.iconButton}
          >
            <Ionicons name="camera-reverse-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    top: 50,
    width: "100%",
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
  iconButton: {
    padding: 10,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: "gray",
  },
  message: {
    textAlign: "center",
    padding: 10,
    color: "white",
  },
});

export default CreateMedia;
