import { ThemedIcon } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ProfileOptionsPopup from "@/Pages/ProfilePage/ProfileOptionsPopup";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const ProfileLayout: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const backgroundColor: any = useThemeColor({}, "background");
  const titleColor: any = useThemeColor({}, "text");
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerShown: true,
          animation: "none",
          headerRight: () => (
            <ProfileOptionsPopup iconName={"ellipsis-horizontal-outline"} />
          ),
          headerLeft: () => (
            <TouchableOpacity style={{}} onPress={() => router.back()}>
              <ThemedIcon name="chevron-back-outline" size={30} />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor },
          headerTitleStyle: { color: titleColor },
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
