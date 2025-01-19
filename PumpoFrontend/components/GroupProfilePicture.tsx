import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import ProfilePicture from "./ProfilePicture";

type GroupProfilePictureProps = {
  imageUrl: string[] | null;
  size?: number;
  borderWidth?: number;
  borderColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const GroupProfilePicture: React.FC<GroupProfilePictureProps> = ({
  imageUrl,
  size = 50,
  borderWidth = 0,
  borderColor = "#ddd",
  onPress,
  style,
}) => {
  const renderMultipleImages = (urls: string[]) => {
    const validUrls = urls
      .slice(0, 3)
      .map((url) => url || "https://via.placeholder.com/50?text=User");

    if (validUrls.length === 2) {
      return (
        <TouchableOpacity
          style={[style, styles.container, { width: size, height: size }]}
          onPress={onPress}
        >
          {validUrls.map((url, index) => (
            <ProfilePicture
              imageUrl={url}
              key={index}
              size={size - 10}
              style={[
                styles.image,
                index == 0 ? { left: 0, bottom: 0 } : { right: 0, top: 0 },
              ]}
              borderColor={"#f0f0f0"}
              borderWidth={2}
              disabled
            />
          ))}
        </TouchableOpacity>
      );
    }

    if (validUrls.length === 3) {
      return (
        <TouchableOpacity
          style={[style, styles.container, { width: size, height: size }]}
          onPress={onPress}
        >
          {validUrls.map((url, index) => (
            <ProfilePicture
              imageUrl={url}
              key={index}
              size={size - 14}
              style={[
                styles.image,
                index == 0
                  ? { left: 0, bottom: 0 }
                  : index == 1
                  ? { alignSelf: "center", top: 0 }
                  : { right: 0, bottom: 0 },
              ]}
              borderColor={"#f0f0f0"}
              borderWidth={2}
              disabled
            />
          ))}
        </TouchableOpacity>
      );
    }

    return null;
  };

  return renderMultipleImages(imageUrl || []);
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
  },
  image: {
    position: "absolute",
    backgroundColor: "#f0f0f0",
  },
});

export default GroupProfilePicture;
