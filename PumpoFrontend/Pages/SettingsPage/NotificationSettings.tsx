import { StyleSheet, Alert } from "react-native";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useSetting } from "@/hooks/useSettings";
import { SETTINGS } from "@/Services/SettingTypes";

const NotificationSettings = () => {
  const { value: pushNotifications, updateSetting: setPushNotifications } =
    useSetting("notifications", "pushNotifications");
  const { value: likesNotifications, updateSetting: setLikesNotifications } =
    useSetting("notifications", "notifyLikes");
  const {
    value: commentsNotifications,
    updateSetting: setCommentsNotifications,
  } = useSetting("notifications", "notifyComments");
  const { value: sharesNotifications, updateSetting: setSharesNotifications } =
    useSetting("notifications", "notifyShares");
  const {
    value: bookmarksNotifications,
    updateSetting: setBookmarksNotifications,
  } = useSetting("notifications", "notifyBookmarks");
  const {
    value: followersNotifications,
    updateSetting: setFollowersNotifications,
  } = useSetting("notifications", "notifyNewFollowers");
  const {
    value: unfollowersNotifications,
    updateSetting: setUnfollowersNotifications,
  } = useSetting("notifications", "notifyUnfollowers");
  const {
    value: newMessagesNotifications,
    updateSetting: setNewMessagesNotifications,
  } = useSetting("notifications", "notifyNewMessages");
  const {
    value: repliesNotifications,
    updateSetting: setRepliesNotifications,
  } = useSetting("notifications", "notifyReplies");
  const {
    value: workoutNotifications,
    updateSetting: setWorkoutNotifications,
  } = useSetting("notifications", "notifyNewWorkoutPlans");
  const {
    value: fitnessStatsNotifications,
    updateSetting: setFitnessStatsNotifications,
  } = useSetting("notifications", "notifyFitnessStatsInteractions");
  const {
    value: taggedInPostNotifications,
    updateSetting: setTaggedInPostNotifications,
  } = useSetting("notifications", "notifyTaggedInPosts");
  const {
    value: taggedInWorkoutNotifications,
    updateSetting: setTaggedInWorkoutNotifications,
  } = useSetting("notifications", "notifyTaggedInWorkouts");
  const {
    value: emailActivityNotifications,
    updateSetting: setEmailActivityNotifications,
  } = useSetting("notifications", "emailActivityUpdates");
  const {
    value: emailFollowerNotifications,
    updateSetting: setEmailFollowerNotifications,
  } = useSetting("notifications", "emailFollowerUpdates");
  const {
    value: emailAccountNotifications,
    updateSetting: setEmailAccountNotifications,
  } = useSetting("notifications", "emailAccountUpdates");
  const { value: soundEnabled, updateSetting: setSoundEnabled } = useSetting(
    "notifications",
    "enableNotificationSound"
  );
  const { value: vibrationEnabled, updateSetting: setVibrationEnabled } =
    useSetting("notifications", "enableNotificationVibration");

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
          value:
            pushNotifications as SETTINGS["notifications"]["pushNotifications"],
          onToggle: (val) => setPushNotifications(val),
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
          value: likesNotifications as SETTINGS["notifications"]["notifyLikes"],
          onToggle: (val) => setLikesNotifications(val),
        },
        {
          id: "activity-2",
          label: "Comments",
          type: "toggle",
          value:
            commentsNotifications as SETTINGS["notifications"]["notifyComments"],
          onToggle: (val) => setCommentsNotifications(val),
        },
        {
          id: "activity-3",
          label: "Shares",
          type: "toggle",
          value:
            sharesNotifications as SETTINGS["notifications"]["notifyShares"],
          onToggle: (val) => setSharesNotifications(val),
        },
        {
          id: "activity-4",
          label: "Bookmarks",
          type: "toggle",
          value:
            bookmarksNotifications as SETTINGS["notifications"]["notifyBookmarks"],
          onToggle: (val) => setBookmarksNotifications(val),
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
          value:
            followersNotifications as SETTINGS["notifications"]["notifyNewFollowers"],
          onToggle: (val) => setFollowersNotifications(val),
        },
        {
          id: "followers-2",
          label: "Unfollowers",
          type: "toggle",
          value:
            unfollowersNotifications as SETTINGS["notifications"]["notifyUnfollowers"],
          onToggle: (val) => setUnfollowersNotifications(val),
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
          value:
            newMessagesNotifications as SETTINGS["notifications"]["notifyNewMessages"],
          onToggle: (val) => setNewMessagesNotifications(val),
        },
        {
          id: "messages-2",
          label: "Replies",
          type: "toggle",
          value:
            repliesNotifications as SETTINGS["notifications"]["notifyReplies"],
          onToggle: (val) => setRepliesNotifications(val),
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
          value:
            workoutNotifications as SETTINGS["notifications"]["notifyNewWorkoutPlans"],
          onToggle: (val) => setWorkoutNotifications(val),
        },
        {
          id: "workout-2",
          label: "Fitness Stats Interactions",
          type: "toggle",
          value:
            fitnessStatsNotifications as SETTINGS["notifications"]["notifyFitnessStatsInteractions"],
          onToggle: (val) => setFitnessStatsNotifications(val),
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
          value:
            taggedInPostNotifications as SETTINGS["notifications"]["notifyTaggedInPosts"],
          onToggle: (val) => setTaggedInPostNotifications(val),
        },
        {
          id: "tagged-2",
          label: "Tagged in Workouts",
          type: "toggle",
          value:
            taggedInWorkoutNotifications as SETTINGS["notifications"]["notifyTaggedInWorkouts"],
          onToggle: (val) => setTaggedInWorkoutNotifications(val),
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
          value:
            emailActivityNotifications as SETTINGS["notifications"]["emailActivityUpdates"],
          onToggle: (val) => setEmailActivityNotifications(val),
        },
        {
          id: "email-2",
          label: "Follower Updates",
          type: "toggle",
          value:
            emailFollowerNotifications as SETTINGS["notifications"]["emailFollowerUpdates"],
          onToggle: (val) => setEmailFollowerNotifications(val),
        },
        {
          id: "email-3",
          label: "Account Updates",
          type: "toggle",
          value:
            emailAccountNotifications as SETTINGS["notifications"]["emailAccountUpdates"],
          onToggle: (val) => setEmailAccountNotifications(val),
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
          value:
            soundEnabled as SETTINGS["notifications"]["enableNotificationSound"],
          onToggle: (val) => setSoundEnabled(val),
        },
        {
          id: "sound-2",
          label: "Enable Vibration",
          type: "toggle",
          value:
            vibrationEnabled as SETTINGS["notifications"]["enableNotificationVibration"],
          onToggle: (val) => setVibrationEnabled(val),
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
