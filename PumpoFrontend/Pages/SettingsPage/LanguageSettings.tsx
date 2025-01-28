import React, { useState } from "react";
import { StyleSheet } from "react-native";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";

const LanguageSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English

  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Chinese", value: "zh" },
    { label: "Japanese", value: "ja" },
    { label: "Hindi", value: "hi" },
    { label: "Arabic", value: "ar" },
  ];

  const languageOptions: SettingOptionGroupProp[] = [
    {
      id: "language-settings",
      title: "Language Settings",
      items: [
        {
          id: "language-dropdown",
          label: "App Language",
          type: "dropdown",
          dropdownOptions: languages,
          dropdownValue: selectedLanguage,
          onDropdownChange: (value) => setSelectedLanguage(value),
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={languageOptions} />;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default LanguageSettings;
