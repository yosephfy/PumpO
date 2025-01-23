import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ToggleIcon from "@/components/ToggleIcon";
import { Ionicons } from "@expo/vector-icons";
import ProfilePicture from "@/components/ProfilePicture";
import CollapsibleText from "@/components/CollapsibleText";
import { MainTabBarHeight } from "@/constants/DimensionsConstants";
import { ResizeMode, Video, Audio } from "expo-av";
import { router } from "expo-router";
import SlidingModal from "@/components/SlidingModal";
import ShareSheet from "@/components/ShareSheet";
import { setAudioModeAsync } from "expo-av/build/Audio";

const { height, width } = Dimensions.get("window");

const SinglePulse = ({
  pulse,
  isViewable,
  handleClickLike,
  handleClickBookmark,
  handleClickFollow,
}: {
  pulse: DT_Pulse;
  isViewable: boolean;
  handleClickLike: (post_id: string) => (liked: boolean) => void;
  handleClickBookmark: (post_id: string) => (bookmarked: boolean) => void;
  handleClickFollow: (user_id: string) => (followed: boolean) => void;
}) => {
  const videoRef = useRef<Video>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [shareSheetVisible, setShareSheetVisible] = useState(false);

  useEffect(() => {
    if (isViewable) {
      videoRef.current?.playAsync();
      setIsPaused(!isViewable);

      const setAudio = async () => {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      };
      setAudio();
    } else {
      videoRef.current?.stopAsync();
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

  const handleClickComment = () => {
    router.push({ pathname: "/comment", params: { post_id: pulse.post_id } });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.videoContainer}
        activeOpacity={1}
        onPress={() => togglePlayPause()}
      >
        <Video
          style={styles.video}
          ref={videoRef}
          source={{ uri: pulse.media_url || "" }}
          resizeMode={ResizeMode.CONTAIN}
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
        <View style={styles.interactionContainer}>
          <TouchableOpacity style={styles.interactionButton}>
            <ToggleIcon
              iconName="heart"
              toggledColor="red"
              untoggledColor="white"
              size={30}
              onToggle={handleClickLike(pulse.post_id)}
              isInitiallyToggled={pulse.interactions.like_id != undefined}
            />
            <Text style={styles.interactionText}>
              {pulse.interactions.like_count}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleClickComment}
            style={styles.interactionButton}
          >
            <Ionicons name="chatbubble-outline" size={30} color="white" />
            <Text style={styles.interactionText}>
              {pulse.interactions.comment_count}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShareSheetVisible(true);
            }}
            style={styles.interactionButton}
          >
            <Ionicons name="share-social-outline" size={30} color="white" />
            <Text style={styles.interactionText}>
              {pulse.interactions.share_count}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <ToggleIcon
              iconName="bookmark"
              toggledColor="white"
              untoggledColor="white"
              size={30}
              onToggle={handleClickBookmark(pulse.post_id)}
              isInitiallyToggled={pulse.interactions.bookmark_id != undefined}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.userInfo}>
            <ProfilePicture
              imageUrl={pulse.user_profile.profile_picture || ""}
              size={40}
              style={{ marginRight: 10 }}
              onPress={() => {
                router.push({
                  pathname: "/(app)/(profile)",
                  params: { user_id: pulse.user_id },
                });
              }}
            />
            <Text style={styles.username}>{pulse.user_profile.username}</Text>
            {!pulse.relationship.followed && (
              <TouchableOpacity
                onPress={() => handleClickFollow(pulse.user_id)(true)}
                style={styles.followButton}
              >
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            )}
          </View>
          <CollapsibleText
            text={pulse.description}
            maxWords={15}
            style={styles.caption}
          />
        </View>
      </TouchableOpacity>
      <SlidingModal
        isVisible={shareSheetVisible}
        onClose={() => setShareSheetVisible(false)}
        snapToPoints={[80]}
        maxHeight={100}
      >
        <ShareSheet />
      </SlidingModal>
    </>
  );
};

export default SinglePulse;

const styles = StyleSheet.create({
  container: {},
  videoContainer: {
    height: height - MainTabBarHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playIcon: {
    position: "absolute",
    alignSelf: "center",
  },
  interactionContainer: {
    position: "absolute",
    right: 15,
    justifyContent: "center",
    paddingTop: 200,
    alignItems: "center",
  },
  interactionButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  interactionText: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
  detailsContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    width: 300,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  followButton: {
    marginLeft: 10,
    borderColor: "#eee",
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  followButtonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  caption: {
    color: "white",
    fontSize: 14,
  },
});
