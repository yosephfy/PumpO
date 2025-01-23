import Profile from "@/Pages/ProfilePage/ProfilePage";
import { useGlobalSearchParams } from "expo-router";
import React from "react";

const CurrentUserProfile = () => {
  const { user_id }: { user_id: string } = useGlobalSearchParams();
  if (user_id)
    return <Profile key={user_id} user_id={user_id} other_user={true} />; // Render the Profile component with fetched data
};

export default CurrentUserProfile;
