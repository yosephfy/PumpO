import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const AccountSettings = () => {
  const accountSettingsOptions: SettingOptionGroupProp[] = [
    {
      id: "1",
      items: [
        {
          id: "1",
          type: "navigation",
          onPress: () => {
            router.push({
              pathname: "/(app)/(my_profile)/(settings)/[setting]/[subsetting]",
              params: {
                setting: "AccountSettings",
                subsetting: "AccountInformation",
              },
            });
          },
          label: "Account Information",
          icon: "person-outline",
          screen: "AccountInformation",
        },
        {
          id: "2",
          label: "Password",
          type: "navigation",
          onPress: () => {
            router.push({
              pathname: "/(app)/(my_profile)/(settings)/[setting]/[subsetting]",
              params: {
                setting: "AccountSettings",
                subsetting: "PasswordSettings",
              },
            });
          },
          icon: "lock-closed-outline",
          screen: "PasswordSettings",
        },
        {
          id: "3",
          label: "Deactivate Account",
          type: "navigation",
          onPress: () => {
            router.push({
              pathname: "/(app)/(my_profile)/(settings)/[setting]/[subsetting]",
              params: {
                setting: "AccountSettings",
                subsetting: "DeactivateAccount",
              },
            });
          },
          icon: "time-outline",
          screen: "DeactivateAccount",
        },
        {
          id: "4",
          label: "Delete Account",
          type: "navigation",
          onPress: () => {
            router.push({
              pathname: "/(app)/(my_profile)/(settings)/[setting]/[subsetting]",
              params: {
                setting: "AccountSettings",
                subsetting: "DeleteAccount",
              },
            });
          },
          icon: "trash-outline",
          screen: "DeleteAccount",
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={accountSettingsOptions} />;
};

export default AccountSettings;
