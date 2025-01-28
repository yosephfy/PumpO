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

const SettingsLayout: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { setting } = useLocalSearchParams();
  const path = usePathname();
  const backgroundColor: any = useThemeColor({}, "background");
  const titleColor: any = useThemeColor({}, "text");
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerShown: true,

          headerStyle: { backgroundColor },
          headerTitleStyle: { color: titleColor },
        }}
      />
      <Stack.Screen
        name="[setting]"
        options={{
          headerShown: true,
          title: "",
          headerStyle: { backgroundColor },
          headerTitleStyle: { color: titleColor },
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
