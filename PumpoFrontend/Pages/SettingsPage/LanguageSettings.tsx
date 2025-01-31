import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useSetting } from "@/hooks/useSettings";
import { SETTINGS } from "@/Services/SettingTypes";
import React from "react";

const LanguageSettings = () => {
  const { value: language, updateSetting: updateLanguage } = useSetting(
    "language",
    "appLanguage"
  );
  // List of available languages
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

  // Language settings options
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
          dropdownValue: language as SETTINGS["language"]["appLanguage"],
          onDropdownChange: updateLanguage,
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={languageOptions} />;
};

export default LanguageSettings;
