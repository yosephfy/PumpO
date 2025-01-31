import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useSetting } from "@/hooks/useSettings";
import { SETTINGS } from "@/Services/SettingTypes";

const InteractionsSettings = () => {
  // State management for toggle switches and dropdowns
  const { value: allowComments, updateSetting: setAllowComments } = useSetting(
    "interactions",
    "whoCanComment"
  );
  const {
    value: enableCommentModeration,
    updateSetting: setEnableCommentModeration,
  } = useSetting("interactions", "enableCommentModeration");
  const { value: allowLikes, updateSetting: setAllowLikes } = useSetting(
    "interactions",
    "allowLikes"
  );
  const { value: allowReactions, updateSetting: setAllowReactions } =
    useSetting("interactions", "allowReactions");
  const { value: whoCanMessageMe, updateSetting: setWhoCanMessageMe } =
    useSetting("interactions", "whoCanMessageMe");
  const { value: allowTagging, updateSetting: setAllowTagging } = useSetting(
    "interactions",
    "allowTagging"
  );
  const { value: reviewTags, updateSetting: setReviewTags } = useSetting(
    "interactions",
    "reviewTagsBeforeAppearance"
  );

  const { value: allowReshares, updateSetting: setAllowReshares } = useSetting(
    "interactions",
    "allowReshares"
  );
  const { value: notifyReshares, updateSetting: setNotifyReshares } =
    useSetting("interactions", "notifyOnReshares");
  const { value: enableAnalytics, updateSetting: setEnableAnalytics } =
    useSetting("interactions", "enableAnalytics");
  const {
    value: hideInteractionCounts,
    updateSetting: setHideInteractionCounts,
  } = useSetting("interactions", "hideInteractionCounts");

  // Settings groups
  const interactionOptions: SettingOptionGroupProp[] = [
    {
      id: "comments",
      title: "Comment Settings",
      items: [
        {
          id: "who-can-comment",
          label: "Who Can Comment On My Posts",
          type: "dropdown",
          dropdownOptions: [
            { label: "Everyone", value: "Everyone" },
            { label: "Only Followers", value: "Only Followers" },
            { label: "Custom List", value: "Custom List" },
            { label: "No One", value: "No One" },
          ],
          dropdownValue:
            allowComments as SETTINGS["interactions"]["whoCanComment"],
          onDropdownChange: (val) =>
            setAllowComments(val as SETTINGS["interactions"]["whoCanComment"]),
        },
        {
          id: "enable-comment-moderation",
          label: "Enable Comment Moderation",
          type: "toggle",
          value:
            enableCommentModeration as SETTINGS["interactions"]["enableCommentModeration"],
          onToggle: () => setEnableCommentModeration(!enableCommentModeration),
        },
        {
          id: "blocked-words",
          label: "Blocked Words in Comments",
          type: "navigation",
          screen: "BlockedWords",
        },
      ],
    },
    {
      id: "likes-reactions",
      title: "Likes and Reactions",
      items: [
        {
          id: "allow-likes",
          label: "Allow Likes on My Posts",
          type: "toggle",
          value: allowLikes as SETTINGS["interactions"]["allowLikes"],
          onToggle: () => setAllowLikes(!allowLikes),
        },
        {
          id: "allow-reactions",
          label: "Allow Reactions on My Posts",
          type: "toggle",
          value: allowReactions as SETTINGS["interactions"]["allowReactions"],
          onToggle: () => setAllowReactions(!allowReactions),
        },
      ],
    },
    {
      id: "messages",
      title: "Direct Messages Interactions",
      items: [
        {
          id: "who-can-message",
          label: "Who Can Message Me",
          type: "dropdown",
          dropdownOptions: [
            { label: "Everyone", value: "Everyone" },
            { label: "Only Followers", value: "Only Followers" },
            { label: "No One", value: "No One" },
          ],
          dropdownValue:
            whoCanMessageMe as SETTINGS["interactions"]["whoCanMessageMe"],
          onDropdownChange: (val) =>
            setWhoCanMessageMe(
              val as SETTINGS["interactions"]["whoCanMessageMe"]
            ),
        },
        {
          id: "message-requests",
          label: "Message Requests",
          type: "navigation",
          screen: "MessageRequests",
        },
      ],
    },
    {
      id: "tagging",
      title: "Tagging Settings",
      items: [
        {
          id: "allow-tagging",
          label: "Allow Tagging",
          type: "toggle",
          value: allowTagging as SETTINGS["interactions"]["allowTagging"],
          onToggle: () => setAllowTagging(!allowTagging),
        },
        {
          id: "review-tags",
          label: "Review Tags Before They Appear",
          type: "toggle",
          value:
            reviewTags as SETTINGS["interactions"]["reviewTagsBeforeAppearance"],
          onToggle: () => setReviewTags(!reviewTags),
        },
      ],
    },

    {
      id: "reshares",
      title: "Reshares",
      items: [
        {
          id: "allow-reshares",
          label: "Allow Reshares of My Posts",
          type: "toggle",
          value: allowReshares as SETTINGS["interactions"]["allowReshares"],
          onToggle: () => setAllowReshares(!allowReshares),
        },
        {
          id: "notify-reshares",
          label: "Notify When My Post Is Reshared",
          type: "toggle",
          value: notifyReshares as SETTINGS["interactions"]["notifyOnReshares"],
          onToggle: () => setNotifyReshares(!notifyReshares),
        },
      ],
    },
    {
      id: "analytics",
      title: "Analytics for Interactions",
      items: [
        {
          id: "enable-analytics",
          label: "Enable Interaction Analytics",
          type: "toggle",
          value: enableAnalytics as SETTINGS["interactions"]["enableAnalytics"],
          onToggle: () => setEnableAnalytics(!enableAnalytics),
        },
        {
          id: "hide-interaction-counts",
          label: "Hide Interaction Counts",
          type: "toggle",
          value:
            hideInteractionCounts as SETTINGS["interactions"]["hideInteractionCounts"],
          onToggle: () => setHideInteractionCounts(!hideInteractionCounts),
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={interactionOptions} />;
};

export default InteractionsSettings;
