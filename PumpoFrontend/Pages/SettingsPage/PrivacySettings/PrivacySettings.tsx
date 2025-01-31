import React from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useRouter } from "expo-router";
import { useSetting } from "@/hooks/useSettings"; // Custom hook for fetching/updating settings
import { SETTINGS } from "@/Services/SettingTypes";

const PrivacySettings = () => {
  const router = useRouter();

  // Retrieve privacy settings using `useSetting`
  const { value: isPrivateAccount, updateSetting: updatePrivateAccount } =
    useSetting("privacy", "privateAccount");

  const { value: isProfileVisible, updateSetting: updateProfileVisibility } =
    useSetting("privacy", "showProfileInSearch");

  const { value: isTaggedProfileVisible, updateSetting: updateTaggedProfile } =
    useSetting("privacy", "showProfileToTaggedUsers");

  const {
    value: isActivityStatusVisible,
    updateSetting: updateActivityStatus,
  } = useSetting("privacy", "showActivityStatus");

  const { value: taggingOption, updateSetting: updateTaggingOption } =
    useSetting("privacy", "whoCanTagMe");

  const { value: mentionOption, updateSetting: updateMentionOption } =
    useSetting("privacy", "whoCanMentionMe");

  const { value: postVisibilityOption, updateSetting: updatePostVisibility } =
    useSetting("privacy", "whoCanSeeMyPosts");

  const { value: storyViewOption, updateSetting: updateStoryView } = useSetting(
    "privacy",
    "whoCanViewMyStories"
  );

  const { value: storyReplyOption, updateSetting: updateStoryReply } =
    useSetting("privacy", "whoCanReplyToMyStories");

  const privacyOptions: SettingOptionGroupProp[] = [
    {
      id: "1",
      items: [
        {
          id: "1",
          label: "Private Account",
          type: "toggle",
          value: isPrivateAccount as SETTINGS["privacy"]["privateAccount"],
          onToggle: () => updatePrivateAccount(!isPrivateAccount),
        },
        {
          id: "8",
          label: "Show Activity Status",
          type: "toggle",
          value:
            isActivityStatusVisible as SETTINGS["privacy"]["showActivityStatus"],
          onToggle: () => updateActivityStatus(!isActivityStatusVisible),
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
          value: isProfileVisible as SETTINGS["privacy"]["showProfileInSearch"],
          onToggle: () => updateProfileVisibility(!isProfileVisible),
        },
        {
          id: "6",
          label: "Show Profile to Tagged Users",
          type: "toggle",
          value:
            isTaggedProfileVisible as SETTINGS["privacy"]["showProfileToTaggedUsers"],
          onToggle: () => updateTaggedProfile(!isTaggedProfileVisible),
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
          dropdownValue: taggingOption as SETTINGS["privacy"]["whoCanTagMe"],
          onDropdownChange: (value) =>
            updateTaggingOption(value as SETTINGS["privacy"]["whoCanTagMe"]),
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
          dropdownValue:
            mentionOption as SETTINGS["privacy"]["whoCanMentionMe"],
          onDropdownChange: (value) =>
            updateMentionOption(value as SETTINGS["privacy"]["whoCanTagMe"]),
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
          dropdownValue:
            postVisibilityOption as SETTINGS["privacy"]["whoCanSeeMyPosts"],
          onDropdownChange: (value) =>
            updatePostVisibility(value as SETTINGS["privacy"]["whoCanTagMe"]),
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
          dropdownValue:
            storyViewOption as SETTINGS["privacy"]["whoCanViewMyStories"],
          onDropdownChange: (value) =>
            updateStoryView(value as SETTINGS["privacy"]["whoCanTagMe"]),
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
          dropdownValue:
            storyReplyOption as SETTINGS["privacy"]["whoCanReplyToMyStories"],
          onDropdownChange: (value) =>
            updateStoryReply(value as SETTINGS["privacy"]["whoCanTagMe"]),
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={privacyOptions} />;
};

export default PrivacySettings;
