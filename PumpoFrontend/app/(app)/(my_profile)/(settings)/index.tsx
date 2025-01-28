import { ThemedView } from "@/components/ThemedView";
import SettingsPage from "@/Pages/SettingsPage/SettingsPage";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Settings: React.FC = () => {
  return (
    <ThemedView>
      <SettingsPage />
    </ThemedView>
  );
};

export default Settings;
