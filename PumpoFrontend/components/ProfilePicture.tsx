import React, { useEffect, useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableHighlightProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type ProfilePictureProps = {
  imageUrl: string;
  size?: number;
  borderWidth?: number;
  borderColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
} & TouchableHighlightProps;

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imageUrl,
  size = 50,
  borderWidth = 0,
  borderColor = "#ddd",
  style,
  disabled = false,
  ...rest
}) => {
  const [url, setUrl] = useState("https://via.placeholder.com/50?text=User");

  useEffect(() => {
    try {
      new URL(imageUrl);
      if (imageUrl.trim() != "") setUrl(imageUrl);
    } catch (error: any) {}
  }, [imageUrl]);
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        style,
        { width: size, height: size, backgroundColor: "transparent" },
      ]}
      {...rest}
    >
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: borderWidth,
            borderColor: borderColor,
          },
        ]}
      >
        <Image
          source={{ uri: url }}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
          onError={(e: any) =>
            (e.currentTarget.src = "https://via.placeholder.com/50?text=User")
          }
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    backgroundColor: "#f0f0f0",
  },
});

export default ProfilePicture;
