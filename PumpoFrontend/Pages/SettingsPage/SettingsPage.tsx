import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SettingsPage = () => {
  const { signOut } = useAuth();

  const handleNavigation = (screen: string) => () => {
    router.push({
      pathname: "/(app)/(my_profile)/(settings)/[setting]",
      params: { setting: screen },
    });
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(); // Use the signOut method from AuthContext
              console.log("Logged out successfully!");
            } catch (error) {
              console.error("Error logging out:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const settingOptions: SettingOptionGroupProp[] = [
    {
      id: "settings",
      items: [
        {
          id: "1",
          label: "Account",
          icon: "person-outline",
          screen: "AccountSettings",
          type: "navigation",
          onPress: handleNavigation("AccountSettings"),
        },
        {
          id: "2",
          label: "Notifications",
          icon: "notifications-outline",
          screen: "NotificationSettings",
          type: "navigation",
          onPress: handleNavigation("NotificationSettings"),
        },
        {
          id: "3",
          label: "Privacy",
          icon: "lock-closed-outline",
          screen: "PrivacySettings",
          type: "navigation",
          onPress: handleNavigation("PrivacySettings"),
        },
        {
          id: "4",
          label: "Appearance",
          icon: "color-palette-outline",
          screen: "AppearanceSettings",
          type: "navigation",
          onPress: handleNavigation("AppearanceSettings"),
        },
        {
          id: "5",
          label: "Language",
          icon: "language-outline",
          screen: "LanguageSettings",
          type: "navigation",
          onPress: handleNavigation("LanguageSettings"),
        },
        {
          id: "6",
          label: "Fitness Preferences",
          icon: "barbell-outline",
          screen: "FitnessPreferences",
          type: "navigation",
          onPress: handleNavigation("FitnessPreferences"),
        },
        {
          id: "7",
          label: "Interaction Settings",
          icon: "chatbubble-outline",
          screen: "InteractionSettings",
          type: "navigation",
          onPress: handleNavigation("InteractionSettings"),
        },
        {
          id: "8",
          label: "Accessibility",
          icon: "eye-outline",
          screen: "AccessibilitySettings",
          type: "navigation",
          onPress: handleNavigation("AccessibilitySettings"),
        },
        {
          id: "9",
          label: "App Support",
          icon: "help-circle-outline",
          screen: "AppSupport",
          type: "navigation",
          onPress: handleNavigation("AppSupport"),
        },
        {
          id: "10",
          label: "About",
          icon: "information-circle-outline",
          screen: "AboutSettings",
          type: "navigation",
          onPress: handleNavigation("AboutSettings"),
        },
      ],
    },
  ];
  return (
    <SettingOptionsComponent
      optionGroups={settingOptions}
      ListFooterComponent={
        <View style={{ marginTop: 10 }}>
          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#fff",
    paddingBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginRight: 15,
    //backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
    //color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsPage;
