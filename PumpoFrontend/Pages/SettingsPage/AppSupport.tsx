import React from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { Alert } from "react-native";

const AppSupport = () => {
  const handleContactSupport = () => {
    Alert.alert(
      "Contact Support",
      "Please email us at support@yourapp.com for assistance."
    );
  };

  const handleReportBug = () => {
    Alert.alert(
      "Report a Bug",
      "Please describe the issue and send it to bugs@yourapp.com."
    );
  };

  const handleSendFeedback = () => {
    Alert.alert(
      "Send Feedback",
      "We value your feedback! Email us at feedback@yourapp.com."
    );
  };

  const appSupportOptions: SettingOptionGroupProp[] = [
    {
      id: "general-support",
      title: "General Support",
      items: [
        {
          id: "faq",
          label: "FAQs",
          type: "navigation",
          icon: "help-circle-outline",
          onPress: () => {
            // Navigate to FAQ page
          },
        },
        {
          id: "contact-support",
          label: "Contact Support",
          type: "navigation",
          icon: "mail-outline",
          onPress: handleContactSupport,
        },
        {
          id: "report-bug",
          label: "Report a Bug",
          type: "navigation",
          icon: "bug-outline",
          onPress: handleReportBug,
        },
      ],
    },
    {
      id: "feedback",
      title: "Feedback",
      items: [
        {
          id: "send-feedback",
          label: "Send Feedback",
          type: "navigation",
          icon: "chatbox-ellipses-outline",
          onPress: handleSendFeedback,
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={appSupportOptions} />;
};

export default AppSupport;
