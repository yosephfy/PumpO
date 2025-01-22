import { ThemedFadedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Audio, ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const VideoPost = ({ post }: { post: DT_Video }) => {
  const videoRef = useRef<Video>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isViewable, setIsViewable] = useState<boolean>(false);
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const postRef = useRef<View>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const checkVisibility = () => {
      if (postRef.current) {
        postRef.current.measureInWindow((x, y, width, height) => {
          // Check if the component is fully visible both vertically and horizontally
          const fullyVisibleVertically =
            y - 100 >= 0 && y + height <= windowHeight - 100;
          const fullyVisibleHorizontally =
            x >= 0 - 1 && x + width <= windowWidth + 1;

          const fullyVisible =
            fullyVisibleVertically && fullyVisibleHorizontally && isFocused;
          setIsViewable(fullyVisible);
        });
      }
    };

    checkVisibility(); // Initial check
    const intervalId = setInterval(checkVisibility, 200); // Periodic checks for scrolling

    return () => clearInterval(intervalId); // Clean up
  }, [windowHeight, windowWidth, isFocused]);

  useEffect(() => {
    if (isViewable) {
      videoRef.current?.playAsync();
      setIsPaused(false);
      const setAudio = async () => {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      };
      setAudio();
    } else {
      videoRef.current?.pauseAsync();
    }
  }, [isViewable]);

  const togglePlayPause = () => {
    if (isPaused) {
      setIsPaused(false);
      videoRef.current?.playAsync();
    } else {
      setIsPaused(true);
      videoRef.current?.pauseAsync();
    }
  };

  return (
    <ThemedFadedView ref={postRef} style={styles.postContent}>
      <TouchableOpacity
        onPress={() => togglePlayPause()}
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Video
          style={styles.video}
          ref={videoRef}
          source={{ uri: post.media_url || "" }}
          resizeMode={ResizeMode.COVER}
          isLooping
        />
        {isPaused && (
          <Ionicons
            name="play-circle"
            size={80}
            color="white"
            style={styles.playIcon}
          />
        )}
      </TouchableOpacity>
    </ThemedFadedView>
  );
};

const styles = StyleSheet.create({
  postContent: {
    width: "100%",
    minHeight: 200,
    maxHeight: 400,
    justifyContent: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playIcon: {
    position: "absolute",
  },
});

export default VideoPost;
