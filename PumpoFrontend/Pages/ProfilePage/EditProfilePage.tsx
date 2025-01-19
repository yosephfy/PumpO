import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import ProfilePicture from "@/components/ProfilePicture";
import EditableInput from "@/components/EditableInput";
import * as ImagePicker from "expo-image-picker";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const EditProfilePage = ({
  user,
  onSave,
}: {
  user: DT_UserProfile;
  onSave: (user: DT_UserProfile) => void;
}) => {
  const [userId, setUserId] = useState(user?.user_id || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.profile_picture || ""
  );
  const [email, setEmail] = useState(user?.email || "");
  const [accountType, setAccountType] = useState(user?.account_type || "");

  const handleSave = () => {
    onSave({
      user_id: userId,
      username: username,
      bio: bio,
      email: email,
      account_type: accountType,
      profile_picture: profilePicture,
    });
  };

  const accountTypes = [
    "Bodybuilder",
    "Athlete",
    "Calisthenics",
    "Combat Sport",
    "Powerlifter",
    "CrossFit",
    "Other",
  ];

  const handleChangePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your photos to proceed."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <ProfilePicture
            imageUrl={profilePicture || ""}
            size={80}
            borderWidth={2}
            borderColor="#ddd"
          />
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={handleChangePhoto}
          >
            <ThemedText type="link" style={styles.changePhotoText}>
              Change Profile Photo
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Username</ThemedText>
          <EditableInput
            value={username}
            onChange={setUsername}
            placeholder="Enter your username"
          />

          <ThemedText style={styles.label}>Bio</ThemedText>
          <EditableInput
            value={bio}
            onChange={setBio}
            placeholder="Enter your bio"
            inputStyle={{ height: 80, textAlignVertical: "top" }}
            paragraphMode
          />

          <ThemedText style={styles.label}>Email</ThemedText>
          <EditableInput
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
          />

          <ThemedText style={styles.label}>Account Type</ThemedText>
          <View style={styles.accountTypeContainer}>
            {accountTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.accountTypeButton,
                  accountType === type && styles.selectedAccountTypeButton,
                ]}
                onPress={() => setAccountType(type)}
              >
                <ThemedText
                  style={[
                    styles.accountTypeText,
                    accountType === type && styles.selectedAccountTypeText,
                  ]}
                >
                  {type}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  changePhotoButton: {
    marginTop: 10,
  },
  changePhotoText: {
    //color: "#007BFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    //color: "#333",
  },
  accountTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  accountTypeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedAccountTypeButton: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  accountTypeText: {
    fontSize: 12,
    //color: "#333",
  },
  selectedAccountTypeText: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfilePage;
