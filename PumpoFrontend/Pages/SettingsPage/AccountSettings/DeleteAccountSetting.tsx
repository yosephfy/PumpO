import React from "react";
import { Alert, StyleSheet } from "react-native";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useRouter } from "expo-router";

const DeleteAccountSetting = () => {
  const router = useRouter();

  const handleDeleteAccountNavigation = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: () => router.push("/account/delete-confirmation"), // Navigate to the delete confirmation screen
        },
      ]
    );
  };

  const deleteAccountOptions: SettingOptionGroupProp[] = [
    {
      id: "warnings",
      title: "Important Warnings",
      items: [
        {
          id: "warning-text",
          type: "text",
          label:
            "• All your data, including posts, followers, and interactions, will be permanently deleted.\n" +
            "• This action is irreversible.\n" +
            "• Deleting your account will also remove access to any associated services or subscriptions.",
        },
      ],
    },
    {
      id: "steps",
      title: "Steps to Delete Your Account",
      items: [
        {
          id: "steps-text",
          type: "text",
          label:
            "1. Ensure you’ve downloaded any important data you might need.\n" +
            "2. Understand that this action cannot be undone.\n" +
            "3. Navigate to the Delete Account page and confirm your decision.",
        },
      ],
    },
    {
      id: "action",
      title: "Action",
      items: [
        {
          id: "navigate-delete",
          label: "Delete Account",
          type: "navigation",
          icon: "trash-outline",
          onPress: handleDeleteAccountNavigation,
        },
      ],
    },
  ];

  return (
    <SettingOptionsComponent
      optionGroups={deleteAccountOptions}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});

export default DeleteAccountSetting;
