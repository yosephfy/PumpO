import React, { useState } from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useRouter } from "expo-router";

const PasswordSetting = () => {
  const router = useRouter();

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [passwordExpiryReminder, setPasswordExpiryReminder] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState("email"); // Default recovery method
  const lastChangedDate = new Date(2023, 10, 1); // Example last changed date

  const optionGroups: SettingOptionGroupProp[] = [
    {
      id: "password-management",
      title: "Password Management",
      items: [
        {
          id: "change-password",
          label: "Change Password",
          type: "navigation",
          icon: "key-outline",
          onPress: () => {},
        },
        {
          id: "enable-2fa",
          label: "Two-Factor Authentication (2FA)",
          type: "toggle",
          value: is2FAEnabled,
          icon: "lock-closed-outline",
          onToggle: () => setIs2FAEnabled((prev) => !prev),
        },
        {
          id: "password-recovery",
          label: "Recovery Options",
          type: "dropdown",
          icon: "shield-checkmark-outline",
          dropdownOptions: [
            { label: "Email", value: "email" },
            { label: "SMS", value: "sms" },
            { label: "Security Questions", value: "security" },
          ],
          dropdownValue: recoveryMethod,
          onDropdownChange: (value) => setRecoveryMethod(value),
        },
        {
          id: "password-expiry-reminder",
          label: "Password Expiry Reminder",
          type: "toggle",
          value: passwordExpiryReminder,
          icon: "time-outline",
          onToggle: () => setPasswordExpiryReminder((prev) => !prev),
        },
        {
          id: "last-changed",
          label: "Last Changed",
          type: "datetime",
          icon: "calendar-outline",
          datetimeValue: lastChangedDate,
          onDateTimeChange: () => {}, // No action since it's read-only
          disabled: true,
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={optionGroups} />;
};

export default PasswordSetting;
