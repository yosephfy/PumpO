import { useAuth } from "@/context/AuthContext";
import Profile from "@/Pages/ProfilePage/ProfilePage";
import { Redirect, router, useGlobalSearchParams } from "expo-router";
import React, { useEffect } from "react";

const CurrentUserProfile = () => {
  const { user_id }: { user_id: string } = useGlobalSearchParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (user_id === currentUser?.user_id) {
      router.replace({ pathname: "/(app)/(my_profile)" });
    }
  }, [user_id, currentUser]);

  if (user_id && currentUser) {
    return <Profile key={user_id} user_id={user_id} other_user={true} />;
  } // Render the Profile component with fetched data
  return null;
};

export default CurrentUserProfile;
