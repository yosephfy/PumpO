import React from "react";
import { Alert } from "react-native";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useRouter } from "expo-router";

const DeactivateAccountSetting = () => {
  const router = useRouter();

  const handleDeactivateNavigation = () => {
    Alert.alert(
      "Confirm Deactivation",
      "Are you sure you want to deactivate your account? You can reactivate it anytime by logging back in.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Proceed",
          onPress: () => {},
        },
      ]
    );
  };

  const optionGroups: SettingOptionGroupProp[] = [
    {
      id: "deactivation",
      title: "Deactivate Account",
      items: [
        {
          id: "deactivation-info",
          label:
            "When you deactivate your account:\n\n" +
            "• Your profile, posts, and activities will no longer be visible to other users.\n" +
            "• You will lose access to all notifications and interactions until reactivated.\n" +
            "• You can reactivate your account anytime by logging back in with your credentials.\n\n" +
            "Steps to deactivate:\n" +
            "1. Review the above warnings carefully.\n" +
            "2. Download any necessary data before deactivation.\n" +
            "3. Tap 'Proceed to Deactivate' to start the process.",
          type: "text",
        },
        {
          id: "proceed-deactivation",
          label: "Proceed to Deactivate",
          type: "navigation",
          icon: "alert-circle-outline",
          onPress: handleDeactivateNavigation,
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={optionGroups} />;
};

export default DeactivateAccountSetting;
