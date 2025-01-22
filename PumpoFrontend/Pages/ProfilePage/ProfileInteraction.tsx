import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  CheckUserFollow,
  FollowUser,
  UnfollowUser,
} from "@/Services/userServices";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { CreateChat, GetChatDetails } from "@/Services/messageServices";
import { timeAgo } from "@/utility/utilities";
import {
  ThemedFadedView,
  ThemedIcon,
  ThemedView,
} from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { openMessage } from "../MessagesPage/NewMessage";

type ProfileInteractionProps = {
  other_user: boolean;
  data: DT_ProfilePage;
};

const ProfileInteraction: React.FC<ProfileInteractionProps> = ({
  other_user,
  data,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { currentUser } = useAuth();

  const handleFollowToggle = async () => {
    try {
      setIsFollowing(!isFollowing);
      if (currentUser) {
        if (isFollowing) {
          await UnfollowUser(currentUser?.user_id, data.user_profile.user_id);
        } else {
          await FollowUser(currentUser?.user_id, data.user_profile.user_id);
        }
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
      Alert.alert("Error", "Unable to update follow status.");
    }
  };

  const handleMessage = async () => {
    if (currentUser)
      await openMessage({
        participants: [data.user_profile.user_id],
        userId: currentUser.user_id,
      });
  };

  const handleWorkoutTimeline = () => {
    Alert.alert("Timeline", "Workout timeline feature coming soon!");
  };

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (currentUser) {
        try {
          const response = await CheckUserFollow({
            follower_id: currentUser.user_id,
            followee_id: data.user_profile.user_id,
          });
          setIsFollowing(response);
        } catch (error) {
          console.error("Error fetching follow status:", error);
        }
      }
    };

    fetchFollowStatus();
  }, [currentUser, data.user_profile.user_id]);

  return (
    <ThemedView style={styles.container}>
      {other_user ? (
        <>
          <TouchableOpacity style={{ flex: 1 }} onPress={handleFollowToggle}>
            <ThemedFadedView
              style={[
                styles.button,
                isFollowing ? styles.unfollowButton : styles.followButton,
              ]}
            >
              <ThemedIcon
                name={`person-${isFollowing ? "remove" : "add"}-outline`}
                size={16}
                //color="#000"
              />
              <ThemedText style={styles.buttonText}>
                {isFollowing ? "Unfollow" : "Follow"}
              </ThemedText>
            </ThemedFadedView>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={handleMessage}>
            <ThemedFadedView style={[styles.button, styles.messageButton]}>
              <ThemedIcon name="chatbubble-outline" size={16} />
              <ThemedText style={styles.buttonText}>Message</ThemedText>
            </ThemedFadedView>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Share", "Profile sharing feature coming soon!")
          }
          style={{ flex: 1 }}
        >
          <ThemedFadedView style={[styles.button, styles.shareButton]}>
            <ThemedIcon name="share-social-outline" size={16} />
            <ThemedText style={styles.buttonText}>Share Profile</ThemedText>
          </ThemedFadedView>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={{ flex: 1 }} onPress={handleWorkoutTimeline}>
        <ThemedFadedView style={[styles.button, styles.timelineButton]}>
          <ThemedIcon name="barbell-outline" size={16} />
          <ThemedText style={styles.buttonText}>Timeline</ThemedText>
        </ThemedFadedView>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 1.5,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    height: 40,
    //backgroundColor: "#ebebeb",
  },
  followButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  unfollowButton: {
    backgroundColor: "rgba(222, 0, 48, 0.36)",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  messageButton: {
    borderRadius: 0,
  },
  shareButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  timelineButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default ProfileInteraction;
