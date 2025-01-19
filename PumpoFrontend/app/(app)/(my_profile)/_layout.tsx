import { ThemedIcon } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const ProfileLayout: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const backgroundColor: any = useThemeColor({}, "background");
  const titleColor: any = useThemeColor({}, "text");

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor },
        headerTitleStyle: { color: titleColor },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerShown: true,
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Edit Profile Icon*/}
              <TouchableOpacity
                onPress={() => router.push("/(app)/(my_profile)/edit")}
              >
                <ThemedIcon
                  name="person-outline"
                  size={24}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
              {/* Settings Icon */}
              <TouchableOpacity
                onPress={() => router.push("/(app)/(my_profile)/settings")}
              >
                <ThemedIcon
                  name="settings-outline"
                  size={24}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </View>
          ),
          animation: "none",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: "Settings", headerShown: true }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: "Edit Profile",
          headerShown: true,
          headerBackTitle: "Cancel",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Text style={{ color: "red", fontSize: 16, marginLeft: 5 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
