import React from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useSetting } from "@/hooks/useSettings"; // Custom hook for fetching/updating settings
import { SETTING_date, SETTINGS } from "@/Services/SettingTypes";
import { Alert } from "react-native";

const AccountInformation = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  // Ensure user ID is available
  const userId = currentUser?.user_id || "";

  // Retrieve account settings using `useSetting`
  const { value: gender, updateSetting: updateGender } = useSetting(
    "account",
    "gender"
  );

  const { value: dateOfBirth, updateSetting: updateDateOfBirth } = useSetting(
    "account",
    "dateOfBirth"
  );
  const { value: accountCreationDate } = useSetting(
    "account",
    "accountCreationDate"
  );

  // Ensure date is properly formatted
  const formattedDate = (data: string) => {
    if (!data || data == "null") return new Date(2000, 0, 1);
    const { day, month, year }: SETTING_date = JSON.parse(
      data as string
    ) as SETTING_date;
    return new Date(year, month, day);
  };

  const formatDate = (data: SETTING_date) => {
    if (!data) return new Date(2000, 0, 1);
    const { year, month, day } = data;
    return new Date(year, month, day);
  };

  const accountInfoOptions: SettingOptionGroupProp[] = [
    {
      id: "profile-security",
      items: [
        {
          id: "edit-profile",
          icon: "person-outline",
          label: "Edit User Profile",
          type: "navigation",
          onPress: () => router.push({ pathname: "/(app)/(my_profile)/edit" }),
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
          datetimeValue: formatDate(dateOfBirth as SETTING_date),
          onDateTimeChange: (date) => {
            updateDateOfBirth({
              year: date.getFullYear(),
              month: date.getMonth(),
              day: date.getDate(),
            });
          },
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
          dropdownValue: gender as SETTINGS["account"]["gender"],
          onDropdownChange: (value) => updateGender(value),
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
          onPress: () => {
            Alert.alert(
              "Account Creation Date",
              formatDate(accountCreationDate as SETTING_date).toDateString()
            );
          }, // Read-only
        },
        {
          id: "account-id",
          label: "Account ID",
          type: "navigation",
          onPress: () => {
            Alert.alert(
              "Account ID",
              currentUser?.user_id.toString() ?? "Not Found!"
            );
          }, // Read-only
        },
        {
          id: "connected-accounts",
          label: "Connected Accounts",
          type: "navigation",
          onPress: () => router.push("/(app)/(settings)/connected-accounts"),
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={accountInfoOptions} />;
};

export default AccountInformation;
