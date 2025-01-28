import React, { useState } from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";

const AccessibilitySettings = () => {
  // State management for accessibility toggles and dropdowns
  const [textScaling, setTextScaling] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [screenReaderSupport, setScreenReaderSupport] = useState(true);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [preferredFontSize, setPreferredFontSize] = useState("Medium");

  // Accessibility settings groups
  const accessibilityOptions: SettingOptionGroupProp[] = [
    {
      id: "vision",
      title: "Vision",
      items: [
        {
          id: "text-scaling",
          label: "Enable Text Scaling",
          type: "toggle",
          value: textScaling,
          onToggle: () => setTextScaling(!textScaling),
        },
        {
          id: "high-contrast-mode",
          label: "Enable High Contrast Mode",
          type: "toggle",
          value: highContrastMode,
          onToggle: () => setHighContrastMode(!highContrastMode),
        },
      ],
    },
    {
      id: "motion",
      title: "Motion",
      items: [
        {
          id: "reduce-motion",
          label: "Reduce Motion",
          type: "toggle",
          value: reduceMotion,
          onToggle: () => setReduceMotion(!reduceMotion),
        },
      ],
    },
    {
      id: "screen-reader",
      title: "Screen Reader Support",
      items: [
        {
          id: "enable-screen-reader",
          label: "Enable Screen Reader Support",
          type: "toggle",
          value: screenReaderSupport,
          onToggle: () => setScreenReaderSupport(!screenReaderSupport),
        },
      ],
    },
    {
      id: "keyboard-navigation",
      title: "Keyboard Navigation",
      items: [
        {
          id: "enable-keyboard-navigation",
          label: "Enable Keyboard Navigation",
          type: "toggle",
          value: keyboardNavigation,
          onToggle: () => setKeyboardNavigation(!keyboardNavigation),
        },
      ],
    },
    {
      id: "font-size",
      title: "Font Size",
      items: [
        {
          id: "preferred-font-size",
          label: "Preferred Font Size",
          type: "dropdown",
          dropdownOptions: [
            { label: "Small", value: "Small" },
            { label: "Medium", value: "Medium" },
            { label: "Large", value: "Large" },
            { label: "Extra Large", value: "Extra Large" },
          ],
          dropdownValue: preferredFontSize,
          onDropdownChange: setPreferredFontSize,
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={accessibilityOptions} />;
};

export default AccessibilitySettings;
