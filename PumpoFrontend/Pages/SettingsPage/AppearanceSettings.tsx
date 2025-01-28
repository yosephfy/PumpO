import SettingOptionsComponent, {
  SettingOptionGroupProp,
  SettingOptionProp,
} from "@/components/OptionsComponent";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Switch } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const AppearanceSettings = () => {
  // States for toggles and dropdowns
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("Medium");
  const [accentColor, setAccentColor] = useState("Blue");
  const [theme, setTheme] = useState("System Default");
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [animationEnabled, setAnimationEnabled] = useState(true);

  // List of appearance settings options
  const appearanceOptions: SettingOptionGroupProp[] = [
    {
      id: "1",
      items: [
        {
          id: "1",
          label: "Dark Mode",
          type: "toggle",
          value: isDarkMode,
          onToggle: () => setIsDarkMode((prev) => !prev),
        },
        {
          id: "2",
          label: "Font Size",
          type: "dropdown",
          dropdownOptions: [
            { label: "Small", value: "Small" },
            { label: "Medium", value: "Medium" },
            { label: "Large", value: "Large" },
          ],
          dropdownValue: fontSize,
          onDropdownChange: setFontSize,
        },
        {
          id: "3",
          label: "Accent Color",
          type: "dropdown",
          dropdownOptions: [
            { label: "Blue", value: "Blue" },
            { label: "Red", value: "Red" },
            { label: "Green", value: "Green" },
            { label: "Purple", value: "Purple" },
          ],
          dropdownValue: accentColor,
          onDropdownChange: setAccentColor,
        },
        {
          id: "4",
          label: "Theme",
          type: "dropdown",
          dropdownOptions: [
            { label: "Light", value: "Light" },
            { label: "Dark", value: "Dark" },
            { label: "System Default", value: "System Default" },
          ],
          dropdownValue: theme,
          onDropdownChange: setTheme,
        },
        {
          id: "5",
          label: "High Contrast Mode",
          type: "toggle",
          value: isHighContrast,
          onToggle: () => setIsHighContrast((prev) => !prev),
        },
        {
          id: "6",
          label: "Animation Effects",
          type: "toggle",
          value: animationEnabled,
          onToggle: () => setAnimationEnabled((prev) => !prev),
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={appearanceOptions} />;
};

export default AppearanceSettings;
