import { Ionicons } from "@expo/vector-icons";
import {
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
interface CreateMediaProps {
  onSubmit: (data: any) => void;
}

const CreateMedia: React.FC<CreateMediaProps> = ({ onSubmit }) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView | null>(null);
  const router = useRouter();

  React.useEffect(() => {
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
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={mediaStyles.container}>
        <Text style={mediaStyles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlashMode = () => {
    setFlashMode((current) => (current === "off" ? "on" : "off"));
  };

  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo captured:", photo?.uri);
        Alert.alert("Photo Captured", `Photo URI: ${photo?.uri}`);
        // Call onSubmit with the captured photo URI.
        onSubmit(photo?.uri);
      } catch (error) {
        Alert.alert("Error", "Failed to capture photo.");
      }
    } else {
      Alert.alert("Error", "Camera is not ready.");
    }
  };

  const openGallery = () => {
    Alert.alert("Gallery", "Open your gallery or file picker here.");
  };

  return (
    <ThemedView style={mediaStyles.container}>
      <CameraView
        style={mediaStyles.camera}
        facing={facing}
        flash={flashMode}
        ref={cameraRef}
      >
        <View style={mediaStyles.topControls}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={mediaStyles.iconButton}
          >
            <Ionicons name="close-outline" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleFlashMode}
            style={mediaStyles.iconButton}
          >
            <Ionicons
              name={flashMode === "off" ? "flash-off-outline" : "flash"}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={mediaStyles.bottomControls}>
          <TouchableOpacity
            onPress={openGallery}
            style={mediaStyles.iconButton}
          >
            <Ionicons name="images-outline" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={mediaStyles.captureButton}
            onPress={captureImage}
          >
            {/* You can design your capture button here */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCameraFacing}
            style={mediaStyles.iconButton}
          >
            <Ionicons name="camera-reverse-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </ThemedView>
  );
};

export default CreateMedia;

const mediaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    zIndex: 10,
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
