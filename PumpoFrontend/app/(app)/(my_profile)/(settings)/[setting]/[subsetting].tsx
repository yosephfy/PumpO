import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import AccountInformation from "@/Pages/SettingsPage/AccountSettings/AccountInformation";
import PasswordSetting from "@/Pages/SettingsPage/AccountSettings/PasswordSetting";
import DeactivateAccountSetting from "@/Pages/SettingsPage/AccountSettings/DeactivateAccountSetting";
import DeleteAccountSetting from "@/Pages/SettingsPage/AccountSettings/DeleteAccountSetting";
import ManageBlockedAccounts from "@/Pages/SettingsPage/PrivacySettings/ManageBlockedAccounts";

type Props = {};

const CurrentSubsetting = (props: Props) => {
  const { subsetting } = useLocalSearchParams();

  const currentSetting = () => {
    switch (subsetting) {
      // Accounts
      case "AccountInformation":
        return <AccountInformation />;
      case "PasswordSettings":
        return <PasswordSetting />;
      case "DeactivateAccount":
        return <DeactivateAccountSetting />;
      case "DeleteAccount":
        return <DeleteAccountSetting />;

      // Notifications

      // Privacy
      case "ManageBlockedAccounts":
        return <ManageBlockedAccounts />;
    }
  };

  return <ThemedView style={{ flex: 1 }}>{currentSetting()}</ThemedView>;
};

export default CurrentSubsetting;
