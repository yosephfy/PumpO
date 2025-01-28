import { View, Text, Alert } from "react-native";
import React from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";

type Props = {};

const AboutSettings = (props: Props) => {
  const aboutOptions: SettingOptionGroupProp[] = [
    {
      id: "about",
      title: "About",
      items: [
        {
          id: "privacy-policy",
          label: "Privacy Policy",
          type: "navigation",
          icon: "document-text-outline",
          onPress: () => {
            // Navigate to Privacy Policy page
          },
        },
        {
          id: "terms-and-conditions",
          label: "Terms & Conditions",
          type: "navigation",
          icon: "document-outline",
          onPress: () => {
            // Navigate to Terms & Conditions page
          },
        },
        {
          id: "app-info",
          label: "App Version",
          type: "navigation",
          icon: "information-circle-outline",
          onPress: () => Alert.alert("App Version", "YourApp v1.0.0"),
        },
      ],
    },
  ];
  return <SettingOptionsComponent optionGroups={aboutOptions} />;
};

export default AboutSettings;
