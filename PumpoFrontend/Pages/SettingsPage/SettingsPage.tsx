import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import {
  ThemedFadedView,
  ThemedIcon,
  ThemedView,
} from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";

const SettingsPage = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { signOut } = useAuth();

  type SettingsOptionProp = {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    screen: string;
  };

  const settingsOptions: SettingsOptionProp[] = [
    {
      id: "1",
      label: "Account",
      icon: "person-outline",
      screen: "AccountSettings",
    },
    {
      id: "2",
      label: "Notifications",
      icon: "notifications-outline",
      screen: "NotificationSettings",
    },
    {
      id: "3",
      label: "Privacy",
      icon: "lock-closed-outline",
      screen: "PrivacySettings",
    },
    {
      id: "4",
      label: "Appearance",
      icon: "color-palette-outline",
      screen: "AppearanceSettings",
    },
    {
      id: "5",
      label: "Language",
      icon: "language-outline",
      screen: "LanguageSettings",
    },
    {
      id: "6",
      label: "Fitness Preferences",
      icon: "barbell-outline",
      screen: "FitnessPreferences",
    },
    {
      id: "7",
      label: "Interaction Settings",
      icon: "chatbubble-outline",
      screen: "InteractionSettings",
    },
    {
      id: "8",
      label: "Accessibility",
      icon: "eye-outline",
      screen: "AccessibilitySettings",
    },
    {
      id: "9",
      label: "App Support",
      icon: "help-circle-outline",
      screen: "AppSupport",
    },
    {
      id: "10",
      label: "About",
      icon: "information-circle-outline",
      screen: "AboutSettings",
    },
  ];

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

  const renderSettingItem = ({
    item,
  }: {
    item: (typeof settingsOptions)[0];
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => handleNavigation(item.screen)}
    >
      <View style={styles.iconContainer}>
        <ThemedIcon name={item.icon} size={24} />
      </View>
      <ThemedText style={styles.label}>{item.label}</ThemedText>
      <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
    </TouchableOpacity>
  );

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
          {/* Dark Mode Toggle */}
          <View style={styles.settingItem}>
            <View style={styles.iconContainer}>
              <ThemedIcon name="moon-outline" size={24} />
            </View>
            <ThemedText style={styles.label}>Dark Mode</ThemedText>
            <Switch
              value={isDarkMode}
              onValueChange={(value) => setIsDarkMode(value)}
            />
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
  return (
    <ThemedView>
      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderSettingItem}
        contentContainerStyle={styles.container}
        ListFooterComponent={
          <View style={{ marginTop: 10 }}>
            {/* Dark Mode Toggle */}
            <View style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <ThemedIcon name="moon-outline" size={24} />
              </View>
              <ThemedText style={styles.label}>Dark Mode</ThemedText>
              <Switch
                value={isDarkMode}
                onValueChange={(value) => setIsDarkMode(value)}
              />
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={24} color="#fff" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        }
        ItemSeparatorComponent={() => <ThemedFadedView style={{ height: 1 }} />}
      />
    </ThemedView>
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
