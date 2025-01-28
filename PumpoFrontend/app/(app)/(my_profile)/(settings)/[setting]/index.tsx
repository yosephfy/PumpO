import { ThemedView } from "@/components/ThemedView";
import AboutSettings from "@/Pages/SettingsPage/AboutSettings";
import AccessibilitySettings from "@/Pages/SettingsPage/AccessibilitySettings";
import AccountInformation from "@/Pages/SettingsPage/AccountSettings/AccountInformation";
import AccountSettings from "@/Pages/SettingsPage/AccountSettings/AccountSettings";
import AppearanceSettings from "@/Pages/SettingsPage/AppearanceSettings";
import AppSupport from "@/Pages/SettingsPage/AppSupport";
import FitnessPreferences from "@/Pages/SettingsPage/FitnessPreferences";
import InteractionsSettings from "@/Pages/SettingsPage/InteractionsSettings";
import LanguageSettings from "@/Pages/SettingsPage/LanguageSettings";
import NotificationSettings from "@/Pages/SettingsPage/NotificationSettings";
import PrivacySettings from "@/Pages/SettingsPage/PrivacySettings/PrivacySettings";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const Setting: React.FC = () => {
  const { setting } = useLocalSearchParams();

  const currentSetting = () => {
    switch (setting) {
      case "AccountSettings":
        return <AccountSettings />;
      case "NotificationSettings":
        return <NotificationSettings />;
      case "PrivacySettings":
        return <PrivacySettings />;
      case "AppearanceSettings":
        return <AppearanceSettings />;
      case "LanguageSettings":
        return <LanguageSettings />;
      case "FitnessPreferences":
        return <FitnessPreferences />;
      case "InteractionSettings":
        return <InteractionsSettings />;
      case "AccessibilitySettings":
        return <AccessibilitySettings />;
      case "AppSupport":
        return <AppSupport />;
      case "AboutSettings":
        return <AboutSettings />;
    }
  };

  return <ThemedView style={{ flex: 1 }}>{currentSetting()}</ThemedView>;
};

export default Setting;
