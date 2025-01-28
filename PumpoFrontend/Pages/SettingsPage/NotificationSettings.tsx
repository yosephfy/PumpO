import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";

const NotificationSettings = () => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [likesNotifications, setLikesNotifications] = useState(true);
  const [commentsNotifications, setCommentsNotifications] = useState(true);
  const [sharesNotifications, setSharesNotifications] = useState(false);
  const [bookmarksNotifications, setBookmarksNotifications] = useState(true);
  const [followersNotifications, setFollowersNotifications] = useState(true);
  const [unfollowersNotifications, setUnfollowersNotifications] =
    useState(false);
  const [newMessagesNotifications, setNewMessagesNotifications] =
    useState(true);
  const [repliesNotifications, setRepliesNotifications] = useState(false);
  const [workoutNotifications, setWorkoutNotifications] = useState(true);
  const [fitnessStatsNotifications, setFitnessStatsNotifications] =
    useState(true);
  const [taggedInPostNotifications, setTaggedInPostNotifications] =
    useState(true);
  const [taggedInWorkoutNotifications, setTaggedInWorkoutNotifications] =
    useState(false);
  const [emailActivityNotifications, setEmailActivityNotifications] =
    useState(true);
  const [emailFollowerNotifications, setEmailFollowerNotifications] =
    useState(false);
  const [emailAccountNotifications, setEmailAccountNotifications] =
    useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);

  const handleMuteNotifications = () => {
    Alert.alert(
      "Mute Notifications",
      "How long would you like to mute notifications?",
      [
        { text: "1 Hour", onPress: () => console.log("Muted for 1 hour") },
        { text: "8 Hours", onPress: () => console.log("Muted for 8 hours") },
        {
          text: "Until Re-enabled",
          onPress: () => console.log("Muted indefinitely"),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const notificationOptions: SettingOptionGroupProp[] = [
    {
      id: "push",
      title: "Push Notifications",
      items: [
        {
          id: "push-1",
          label: "Enable Push Notifications",
          type: "toggle",
          value: pushNotifications,
          onToggle: () => setPushNotifications((prev) => !prev),
        },
      ],
    },
    {
      id: "activity",
      title: "Activity Notifications",
      items: [
        {
          id: "activity-1",
          label: "Likes",
          type: "toggle",
          value: likesNotifications,
          onToggle: () => setLikesNotifications((prev) => !prev),
        },
        {
          id: "activity-2",
          label: "Comments",
          type: "toggle",
          value: commentsNotifications,
          onToggle: () => setCommentsNotifications((prev) => !prev),
        },
        {
          id: "activity-3",
          label: "Shares",
          type: "toggle",
          value: sharesNotifications,
          onToggle: () => setSharesNotifications((prev) => !prev),
        },
        {
          id: "activity-4",
          label: "Bookmarks",
          type: "toggle",
          value: bookmarksNotifications,
          onToggle: () => setBookmarksNotifications((prev) => !prev),
        },
      ],
    },
    {
      id: "followers",
      title: "Follower Notifications",
      items: [
        {
          id: "followers-1",
          label: "New Followers",
          type: "toggle",
          value: followersNotifications,
          onToggle: () => setFollowersNotifications((prev) => !prev),
        },
        {
          id: "followers-2",
          label: "Unfollowers",
          type: "toggle",
          value: unfollowersNotifications,
          onToggle: () => setUnfollowersNotifications((prev) => !prev),
        },
      ],
    },
    {
      id: "messages",
      title: "Message Notifications",
      items: [
        {
          id: "messages-1",
          label: "New Messages",
          type: "toggle",
          value: newMessagesNotifications,
          onToggle: () => setNewMessagesNotifications((prev) => !prev),
        },
        {
          id: "messages-2",
          label: "Replies",
          type: "toggle",
          value: repliesNotifications,
          onToggle: () => setRepliesNotifications((prev) => !prev),
        },
      ],
    },
    {
      id: "workout",
      title: "Workout & Fitness Notifications",
      items: [
        {
          id: "workout-1",
          label: "New Workout Plans",
          type: "toggle",
          value: workoutNotifications,
          onToggle: () => setWorkoutNotifications((prev) => !prev),
        },
        {
          id: "workout-2",
          label: "Fitness Stats Interactions",
          type: "toggle",
          value: fitnessStatsNotifications,
          onToggle: () => setFitnessStatsNotifications((prev) => !prev),
        },
      ],
    },
    {
      id: "tagged",
      title: "Tagged Notifications",
      items: [
        {
          id: "tagged-1",
          label: "Tagged in Posts",
          type: "toggle",
          value: taggedInPostNotifications,
          onToggle: () => setTaggedInPostNotifications((prev) => !prev),
        },
        {
          id: "tagged-2",
          label: "Tagged in Workouts",
          type: "toggle",
          value: taggedInWorkoutNotifications,
          onToggle: () => setTaggedInWorkoutNotifications((prev) => !prev),
        },
      ],
    },
    {
      id: "mute",
      items: [
        {
          id: "mute-1",
          icon: "notifications-off-outline",
          label: "Mute Notifications",
          type: "navigation",
          onPress: handleMuteNotifications,
        },
      ],
    },
    {
      id: "email",
      title: "Email Notifications",
      items: [
        {
          id: "email-1",
          label: "Activity Updates",
          type: "toggle",
          value: emailActivityNotifications,
          onToggle: () => setEmailActivityNotifications((prev) => !prev),
        },
        {
          id: "email-2",
          label: "Follower Updates",
          type: "toggle",
          value: emailFollowerNotifications,
          onToggle: () => setEmailFollowerNotifications((prev) => !prev),
        },
        {
          id: "email-3",
          label: "Account Updates",
          type: "toggle",
          value: emailAccountNotifications,
          onToggle: () => setEmailAccountNotifications((prev) => !prev),
        },
      ],
    },
    {
      id: "sound",
      title: "Sound & Vibration",
      items: [
        {
          id: "sound-1",
          label: "Enable Sound",
          type: "toggle",
          value: soundEnabled,
          onToggle: () => setSoundEnabled((prev) => !prev),
        },
        {
          id: "sound-2",
          label: "Enable Vibration",
          type: "toggle",
          value: vibrationEnabled,
          onToggle: () => setVibrationEnabled((prev) => !prev),
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={notificationOptions} />;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default NotificationSettings;
