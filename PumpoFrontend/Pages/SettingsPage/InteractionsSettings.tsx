import React, { useState } from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";

const InteractionsSettings = () => {
  // State management for toggle switches and dropdowns
  const [allowComments, setAllowComments] = useState("Everyone");
  const [enableCommentModeration, setEnableCommentModeration] = useState(false);
  const [allowLikes, setAllowLikes] = useState(true);
  const [allowReactions, setAllowReactions] = useState(true);
  const [whoCanMessageMe, setWhoCanMessageMe] = useState("Everyone");
  const [allowTagging, setAllowTagging] = useState(true);
  const [reviewTags, setReviewTags] = useState(false);
  const [whoCanMentionMe, setWhoCanMentionMe] = useState("Everyone");
  const [allowReshares, setAllowReshares] = useState(true);
  const [notifyReshares, setNotifyReshares] = useState(true);
  const [enableAnalytics, setEnableAnalytics] = useState(true);
  const [hideInteractionCounts, setHideInteractionCounts] = useState(false);

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
          dropdownValue: allowComments,
          onDropdownChange: setAllowComments,
        },
        {
          id: "enable-comment-moderation",
          label: "Enable Comment Moderation",
          type: "toggle",
          value: enableCommentModeration,
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
          value: allowLikes,
          onToggle: () => setAllowLikes(!allowLikes),
        },
        {
          id: "allow-reactions",
          label: "Allow Reactions on My Posts",
          type: "toggle",
          value: allowReactions,
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
          dropdownValue: whoCanMessageMe,
          onDropdownChange: setWhoCanMessageMe,
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
          value: allowTagging,
          onToggle: () => setAllowTagging(!allowTagging),
        },
        {
          id: "review-tags",
          label: "Review Tags Before They Appear",
          type: "toggle",
          value: reviewTags,
          onToggle: () => setReviewTags(!reviewTags),
        },
      ],
    },
    {
      id: "mentions",
      title: "Mentions",
      items: [
        {
          id: "who-can-mention",
          label: "Who Can Mention Me",
          type: "dropdown",
          dropdownOptions: [
            { label: "Everyone", value: "Everyone" },
            { label: "Only People I Follow", value: "Only People I Follow" },
            { label: "No One", value: "No One" },
          ],
          dropdownValue: whoCanMentionMe,
          onDropdownChange: setWhoCanMentionMe,
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
          value: allowReshares,
          onToggle: () => setAllowReshares(!allowReshares),
        },
        {
          id: "notify-reshares",
          label: "Notify When My Post Is Reshared",
          type: "toggle",
          value: notifyReshares,
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
          value: enableAnalytics,
          onToggle: () => setEnableAnalytics(!enableAnalytics),
        },
        {
          id: "hide-interaction-counts",
          label: "Hide Interaction Counts",
          type: "toggle",
          value: hideInteractionCounts,
          onToggle: () => setHideInteractionCounts(!hideInteractionCounts),
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={interactionOptions} />;
};

export default InteractionsSettings;
