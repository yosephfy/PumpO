import { ThemedIcon } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const FullPostLayout: React.FC = () => {
  const backgroundColor: any = useThemeColor({}, "background");
  const titleColor: any = useThemeColor({}, "text");
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Post",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity style={{}} onPress={() => router.back()}>
              <ThemedIcon name="chevron-back-outline" size={30} />
            </TouchableOpacity>
          ),
          headerBackButtonDisplayMode: "minimal",
          headerStyle: { backgroundColor },
          headerTitleStyle: { color: titleColor },
        }}
      />
    </Stack>
  );
};

export default FullPostLayout;
