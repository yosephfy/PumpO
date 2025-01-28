import { ThemedIcon } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import ProfileOptionsPopup from "@/Pages/ProfilePage/ProfileOptionsPopup";
import {
  Stack,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const SettingLayout: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { setting, subsetting } = useLocalSearchParams();
  const path = usePathname();
  const backgroundColor: any = useThemeColor({}, "background");
  const titleColor: any = useThemeColor({}, "text");
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: (setting as string) || "",
          headerShown: false,
          headerBackVisible: false,
          headerStyle: { backgroundColor },
          headerTitleStyle: { color: titleColor },
        }}
      />
      <Stack.Screen
        name="[subsetting]"
        options={{
          title: (subsetting as string) || "",
          headerShown: false,
          headerBackVisible: false,
          headerStyle: { backgroundColor },
          headerTitleStyle: { color: titleColor },
        }}
      />
    </Stack>
  );
};

export default SettingLayout;
