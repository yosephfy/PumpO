import { useAuth } from "@/context/AuthContext";
import Profile from "@/Pages/ProfilePage/ProfilePage";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CurrentUserProfile = () => {
  const { currentUser } = useAuth(); // Access the current user from AuthProvider

  return !currentUser ? (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>ERROR</Text>
    </View>
  ) : (
    <Profile user_id={currentUser.user_id} other_user={false} />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default CurrentUserProfile;
