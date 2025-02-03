// /create/_layout.tsx
import PostsProvider from "@/context/PostContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, Stack } from "expo-router";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function CreateLayout() {
  const backgroundColor: any = useThemeColor({}, "background");
  const titleColor: any = useThemeColor({}, "text");
  return (
    <PostsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            title: "Create Content",
            headerShown: true,
            headerStyle: { backgroundColor },
            headerTitleStyle: { color: titleColor },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.replace({ pathname: "/(app)" })}
              >
                <Text style={{ color: "red", fontSize: 16, marginLeft: 5 }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="[postType]" options={{ title: "[postType]" }} />
      </Stack>
    </PostsProvider>
  );
}
