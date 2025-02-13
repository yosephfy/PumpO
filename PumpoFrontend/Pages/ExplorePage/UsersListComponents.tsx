import ProfilePicture from "@/components/ProfilePicture";
import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const UserList = ({
  users,
}: {
  users: (DT_UserProfile & {
    follower_count: number;
    mutual_friends: string;
    mutual_friends_count: number;
  })[];
}) => {
  return (
    <FlatList
      data={users}
      renderItem={({ item, index }) => <UserItem user={item} />}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <ThemedView style={{ height: 1 }} />}
      style={{ marginBottom: 100 }}
    />
  );
};

export const UserItem = ({
  user,
}: {
  user: DT_UserProfile & {
    follower_count: number;
    mutual_friends: string;
    mutual_friends_count: number;
  };
}) => {
  return (
    <TouchableOpacity style={styles.userItemContainer}>
      <ProfilePicture imageUrl={user.profile_picture || ""} size={40} />
      <View style={styles.userItemMain}>
        <ThemedText style={styles.userItemMainText} type="subtitle">
          {user.username}
        </ThemedText>
        <View style={styles.userItemSecondary}>
          <ThemedText
            style={styles.userSecondaryItemText}
            darkColor="#999"
            lightColor="#555"
          >
            {user.account_type}
          </ThemedText>
          {user.mutual_friends && (
            <ThemedText
              style={styles.userSecondaryItemText}
              darkColor="#999"
              lightColor="#555"
            >
              Mutuals with {user.mutual_friends}
            </ThemedText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userItemContainer: {
    //backgroundColor: "pink",
    flexDirection: "row",
    padding: 10,
    gap: 15,
  },
  userItemMain: {
    //backgroundColor: "cyan",
    flex: 1,
  },
  userItemMainText: { fontSize: 14, marginVertical: 5 },
  userItemSecondary: {
    //backgroundColor: "pink",
    flexDirection: "row",
    gap: 30,
  },
  userSecondaryItemText: { fontSize: 14 },
});
