import Profile from "@/Pages/ProfilePage/ProfilePage";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const CurrentUserProfile = () => {
  const { user_id }: { user_id: string } = useGlobalSearchParams();

  return <Profile user_id={user_id} other_user={true} />; // Render the Profile component with fetched data
};

export default CurrentUserProfile;
