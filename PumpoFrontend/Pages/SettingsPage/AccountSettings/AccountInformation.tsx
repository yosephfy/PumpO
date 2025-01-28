import React, { useState } from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { router, useRouter } from "expo-router";

const AccountInformation = () => {
  const [gender, setGender] = useState("Prefer not to say"); // Example default gender
  const [twoFactorAuth, setTwoFactorAuth] = useState(false); // Example toggle state
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date(2000, 0, 1)); // Default to Jan 1, 2000

  const accountOptions: SettingOptionGroupProp[] = [
    {
      id: "profile-security",

      items: [
        {
          id: "edit-profile",
          icon: "person-outline",
          label: "Edit User Profile",
          type: "navigation",
          onPress: () => router.push({ pathname: "/(app)/(my_profile)/edit" }), // Redirect to your Edit Profile page
        },
      ],
    },
    {
      id: "personal-information",
      title: "Personal Information",
      items: [
        {
          id: "date-of-birth",
          label: "Date of Birth",
          type: "datetime",
          datetimeValue: dateOfBirth,
          onDateTimeChange: setDateOfBirth,
        },
        {
          id: "gender",
          label: "Gender",
          type: "dropdown",
          dropdownOptions: [
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Prefer not to say", value: "Prefer not to say" },
          ],
          dropdownValue: gender,
          onDropdownChange: setGender,
        },
      ],
    },
    {
      id: "account-details",
      title: "Account Details",
      items: [
        {
          id: "account-creation-date",
          label: "Account Creation Date",
          type: "navigation",
          onPress: () => {}, // Read-only, no action needed
        },
        {
          id: "account-id",
          label: "Account ID",
          type: "navigation",
          onPress: () => {}, // Read-only, no action needed
        },
        {
          id: "connected-accounts",
          label: "Connected Accounts",
          type: "navigation",
          onPress: () => router.push("/(app)/(settings)/connected-accounts"), // Redirect to Connected Accounts page
        },
        {
          id: "two-factor-auth",
          label: "Two-Factor Authentication",
          type: "toggle",
          value: twoFactorAuth,
          onToggle: () => setTwoFactorAuth(!twoFactorAuth),
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={accountOptions} />;
};

export default AccountInformation;
