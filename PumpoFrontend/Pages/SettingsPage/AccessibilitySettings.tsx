import React, { useState } from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useSetting } from "@/hooks/useSettings";
import { SETTINGS } from "@/Services/SettingTypes";

const AccessibilitySettings = () => {
  const { value: keyboardNavigation, updateSetting: setKeyboardNavigation } =
    useSetting("accessibility", "enableKeyboardNavigation");
  const { value: textScaling, updateSetting: setTextScaling } = useSetting(
    "accessibility",
    "textScaling"
  );
  const { value: highContrastMode, updateSetting: setHighContrastMode } =
    useSetting("accessibility", "highContrastMode");
  const { value: reduceMotion, updateSetting: setReduceMotion } = useSetting(
    "accessibility",
    "reduceMotion"
  );
  const { value: enableScreenReader, updateSetting: setScreenReaderSupport } =
    useSetting("accessibility", "enableScreenReader");
  const { value: preferredFontSize, updateSetting: setPreferredFontSize } =
    useSetting("accessibility", "preferredFontSize");

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
          value: textScaling as SETTINGS["accessibility"]["textScaling"],
          onToggle: (val) => setTextScaling(val),
        },
        {
          id: "high-contrast-mode",
          label: "Enable High Contrast Mode",
          type: "toggle",
          value:
            highContrastMode as SETTINGS["accessibility"]["highContrastMode"],
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
          value: reduceMotion as SETTINGS["accessibility"]["reduceMotion"],
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
          value:
            enableScreenReader as SETTINGS["accessibility"]["reduceMotion"],
          onToggle: () => setScreenReaderSupport(!enableScreenReader),
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
          value:
            keyboardNavigation as SETTINGS["accessibility"]["enableKeyboardNavigation"],
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
          dropdownValue:
            preferredFontSize as SETTINGS["accessibility"]["preferredFontSize"],
          onDropdownChange: (val) =>
            setPreferredFontSize(
              val as SETTINGS["accessibility"]["preferredFontSize"]
            ),
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={accessibilityOptions} />;
};

export default AccessibilitySettings;
