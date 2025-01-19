import GroupProfilePicture from "@/components/GroupProfilePicture";
import PopupCard from "@/components/PopupCard";
import ProfilePicture from "@/components/ProfilePicture";
import { ThemedText } from "@/components/ThemedText";
import { ThemedIcon } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import MessageOptions from "@/Pages/MessagesPage/MessageOptions";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MessagesLayout: React.FC = () => {
  const params: any = useGlobalSearchParams();
  const router = useRouter();

  const [isPostOptionsVisible, setPostOptionsVisible] = useState(false);

  const handlePostOptionsOpen = () => setPostOptionsVisible(true);
  const handlePostOptionsClose = () => setPostOptionsVisible(false);

  const backgroundColor: any = useThemeColor({}, "background");
  const titleColor: any = useThemeColor({}, "text");
  if (params)
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
            title: "Messages",
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/(messages)/new_message")}
              >
                <ThemedIcon
                  name="create-outline"
                  size={30}
                  style={{ marginRight: 0 }}
                />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={{}}
                onPress={() => router.replace("/(app)")}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={30}
                  color="#007BFF"
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="message"
          options={{
            title: "",
            headerShown: true,

            headerRight: () => (
              <>
                <TouchableOpacity onPress={handlePostOptionsOpen}>
                  <ThemedIcon
                    name="ellipsis-horizontal-outline"
                    size={30}
                    style={{ marginRight: 0 }}
                  />
                </TouchableOpacity>
                <PopupCard
                  visible={isPostOptionsVisible}
                  onClose={handlePostOptionsClose}
                >
                  <MessageOptions />
                </PopupCard>
              </>
            ),
            headerLeft: () => (
              <View>
                <View style={styles.headerContainer}>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      router.dismissTo("/(messages)");
                    }}
                  >
                    <Ionicons
                      name="chevron-back-outline"
                      size={30}
                      color="#007BFF"
                    />
                  </TouchableOpacity>
                  {params.chat_type === "group" ? (
                    <GroupProfilePicture
                      imageUrl={params.profile_picture.split(",") || []}
                      size={35}
                    />
                  ) : (
                    <ProfilePicture
                      imageUrl={params.profile_picture || ""}
                      size={35}
                      borderWidth={0}
                    />
                  )}
                  <ThemedText
                    style={styles.username}
                    textBreakStrategy="balanced"
                    lineBreakMode="head"
                    numberOfLines={1}
                  >
                    {params.chat_name}
                  </ThemedText>
                </View>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="new_message"
          options={{
            title: "New message",
            headerShown: true,
            headerBackButtonDisplayMode: "minimal",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
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

export default MessagesLayout;

const styles = StyleSheet.create({
  headerContainer: {
    width: 200,
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
