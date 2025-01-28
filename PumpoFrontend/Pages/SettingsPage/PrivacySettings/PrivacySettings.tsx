import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown"; // Import Dropdown component
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedFadedView, ThemedIcon } from "@/components/ThemedView";
import { router } from "expo-router";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
  SettingOptionProp,
} from "@/components/OptionsComponent";

const PrivacySettings = () => {
  // States for toggles
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const [isTaggedProfileVisible, setIsTaggedProfileVisible] = useState(true);
  const [isActivityStatusVisible, setIsActivityStatusVisible] = useState(true);

  // States for dropdown options
  const [taggingOption, setTaggingOption] = useState("Everyone");
  const [mentionOption, setMentionOption] = useState("Everyone");
  const [postVisibilityOption, setPostVisibilityOption] = useState("Everyone");
  const [storyViewOption, setStoryViewOption] = useState("Everyone");
  const [storyReplyOption, setStoryReplyOption] = useState("Everyone");

  const privacyOptions: SettingOptionGroupProp[] = [
    {
      id: "1",
      items: [
        {
          id: "1",
          label: "Private Account",
          type: "toggle",
          value: isPrivateAccount,
          onToggle: () => setIsPrivateAccount((prev) => !prev),
        },
        {
          id: "8",
          label: "Show Activity Status",
          type: "toggle",
          value: isActivityStatusVisible,
          onToggle: () => setIsActivityStatusVisible((prev) => !prev),
        },
        {
          id: "2",
          label: "Manage Blocked Users",
          type: "navigation",
          screen: "ManageBlockedAccounts",
          onPress: () => {
            router.push({
              pathname: "/(app)/(my_profile)/(settings)/[setting]/[subsetting]",
              params: {
                setting: "PrivacySettings",
                subsetting: "ManageBlockedAccounts",
              },
            });
          },
        },
        {
          id: "5",
          label: "Show Profile in Search",
          type: "toggle",
          value: isProfileVisible,
          onToggle: () => setIsProfileVisible((prev) => !prev),
        },
        {
          id: "6",
          label: "Show Profile to Tagged Users",
          type: "toggle",
          value: isTaggedProfileVisible,
          onToggle: () => setIsTaggedProfileVisible((prev) => !prev),
        },
        {
          id: "3",
          label: "Who Can Tag Me",
          type: "dropdown",
          dropdownOptions: [
            { label: "Everyone", value: "Everyone" },
            { label: "Only People I Follow", value: "OnlyPeopleIFollow" },
            { label: "No One", value: "NoOne" },
          ],
          dropdownValue: taggingOption,
          onDropdownChange: setTaggingOption,
        },
        {
          id: "4",
          label: "Who Can Mention Me",
          type: "dropdown",
          dropdownOptions: [
            { label: "Everyone", value: "Everyone" },
            { label: "Only People I Follow", value: "OnlyPeopleIFollow" },
            { label: "No One", value: "NoOne" },
          ],
          dropdownValue: mentionOption,
          onDropdownChange: setMentionOption,
        },

        {
          id: "7",
          label: "Who Can See My Posts",
          type: "dropdown",
          dropdownOptions: [
            { label: "Everyone", value: "Everyone" },
            { label: "Only Followers", value: "OnlyFollowers" },
            { label: "Custom List", value: "CustomList" },
          ],
          dropdownValue: postVisibilityOption,
          onDropdownChange: setPostVisibilityOption,
        },

        {
          id: "9",
          label: "Who Can View My Stories",
          type: "dropdown",
          dropdownOptions: [
            { label: "Everyone", value: "Everyone" },
            { label: "Only Followers", value: "OnlyFollowers" },
            { label: "Custom List", value: "CustomList" },
          ],
          dropdownValue: storyViewOption,
          onDropdownChange: setStoryViewOption,
        },
        {
          id: "10",
          label: "Who Can Reply to My Stories",
          type: "dropdown",
          dropdownOptions: [
            { label: "Everyone", value: "Everyone" },
            { label: "Only People I Follow", value: "OnlyPeopleIFollow" },
            { label: "No One", value: "NoOne" },
          ],
          dropdownValue: storyReplyOption,
          onDropdownChange: setStoryReplyOption,
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={privacyOptions} />;
};

export default PrivacySettings;
