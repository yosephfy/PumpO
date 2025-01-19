import { useAuth } from "@/context/AuthContext";
import EditProfilePage from "@/Pages/ProfilePage/EditProfilePage";
import { GetUserProfile, UpdateUserProfile } from "@/Services/userServices";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

const EditProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState<DT_UserProfile | null>(null); // Use null as initial value
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser?.user_id) {
          const userProfile = await GetUserProfile(currentUser.user_id);
          setUser(userProfile); // Update user state with fetched data
        }
      } catch (error: any) {
        console.error("Failed to fetch user data:", error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchUserData();
  }, [currentUser]);

  const onSave = async (updatedUser: DT_UserProfile) => {
    try {
      if (currentUser?.user_id) {
        await UpdateUserProfile(currentUser.user_id, updatedUser);
        setUser(updatedUser); // Update local user state after saving changes
        router.dismiss();
      }
    } catch (error: any) {
      console.error("Failed to update user profile:", error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load profile data.</Text>
      </View>
    );
  }

  return <EditProfilePage user={user} onSave={onSave} />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default EditProfile;
