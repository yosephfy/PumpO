import CollapsibleText from "@/components/CollapsibleText";
import ProfilePicture from "@/components/ProfilePicture";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfileHeader = ({
  data,
  other_user,
}: {
  data: DT_ProfilePage;
  other_user: boolean;
}) => {
  const { user_profile, user_stats, fitness_profile } = data;
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profilePicture}>
          <ProfilePicture imageUrl={user_profile.profile_picture} size={80} />
        </View>
        <View style={styles.profileDetails}>
          <ThemedText style={styles.username}>
            {user_profile.username}
          </ThemedText>
          <ThemedText style={styles.accountType} type="subtitle">
            {user_profile.account_type}
          </ThemedText>
          <ThemedText style={styles.weightSeason}>
            Currently {fitness_profile.seasonal_status}
          </ThemedText>
        </View>
        <View style={styles.statsContainer}>
          <ThemedText style={styles.statText}>
            {user_stats.followers}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Followers</ThemedText>
          <ThemedText style={styles.statText}>
            {user_stats.following}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Following</ThemedText>
          <ThemedText style={styles.statText}>{user_stats.posts}</ThemedText>
          <ThemedText style={styles.statLabel}>Posts</ThemedText>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <ThemedText style={styles.bioLabel}>Bio</ThemedText>
        <CollapsibleText
          text={user_profile.bio}
          maxWords={15}
          style={styles.bioContentText}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 16,
    //borderBottomWidth: 1,
    //borderBottomColor: "#ddd",
    //backgroundColor: "#g5g5g5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 22,
  },
  accountType: {
    fontSize: 16,
    //color: "gray",
    marginTop: 4,
  },
  weightSeason: {
    fontSize: 12,
    //color: "gray",
    fontStyle: "italic",
  },
  statsContainer: {
    alignItems: "flex-end",
    marginRight: 5,
  },
  statText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  statLabel: {
    fontSize: 12,
    //color: "gray",
  },
  bioContainer: {
    flex: 1,
    marginTop: 10,
  },
  bioLabel: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 14,
  },
  bioContentText: {
    fontSize: 12,
    //color: "#333",
  },
  showMoreLessText: {
    fontSize: 12,
    color: "#007BFF",
  },
});

export default ProfileHeader;
