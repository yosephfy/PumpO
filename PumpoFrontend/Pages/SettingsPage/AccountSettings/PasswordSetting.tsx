import React from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useRouter } from "expo-router";
import { useSetting } from "@/hooks/useSettings"; // Make sure to place your hook in a proper folder
import { SETTING_date, SETTINGS } from "@/Services/SettingTypes";

const PasswordSetting = () => {
  const router = useRouter();
  const { value: is2FAEnabled, updateSetting: update2FA } = useSetting(
    "security",
    "enable2FA"
  );
  const { value: passwordExpiryReminder, updateSetting: updateExpiryReminder } =
    useSetting("security", "passwordExpiryReminder");
  const { value: recoveryMethod, updateSetting: updateRecoveryMethod } =
    useSetting("security", "passwordRecoveryMethod");
  const { value: lastChangedDate } = useSetting(
    "security",
    "lastPasswordChanged"
  );

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
          onPress: () => router.push("/(app)/(settings)/change-password"),
        },
        {
          id: "enable-2fa",
          label: "Two-Factor Authentication (2FA)",
          type: "toggle",
          value: is2FAEnabled as SETTINGS["security"]["enable2FA"],
          icon: "lock-closed-outline",
          onToggle: (val) => update2FA(val),
        },
        {
          id: "password-recovery",
          label: "Recovery Options",
          type: "dropdown",
          icon: "shield-checkmark-outline",
          dropdownOptions: [
            { label: "Email", value: "Email" },
            { label: "SMS", value: "SMS" },
            { label: "Security Questions", value: "Security Questions" },
          ],
          dropdownValue:
            recoveryMethod as SETTINGS["security"]["passwordRecoveryMethod"],
          onDropdownChange: (value) =>
            updateRecoveryMethod(
              value as SETTINGS["security"]["passwordRecoveryMethod"]
            ),
        },
        {
          id: "password-expiry-reminder",
          label: "Password Expiry Reminder",
          type: "toggle",
          value:
            passwordExpiryReminder as SETTINGS["security"]["passwordExpiryReminder"],
          icon: "time-outline",
          onToggle: () => updateExpiryReminder(!passwordExpiryReminder),
        },
        {
          id: "last-changed",
          label: "Last Changed",
          type: "datetime",
          icon: "calendar-outline",
          datetimeValue: (() => {
            if (!lastChangedDate) return new Date();
            const { day, month, year }: SETTING_date =
              lastChangedDate as SETTINGS["security"]["lastPasswordChanged"];

            return new Date(year, month, day);
          })(),

          onDateTimeChange: () => {}, // Read-only, no changes
          disabled: true,
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={optionGroups} />;
};

export default PasswordSetting;
