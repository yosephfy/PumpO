import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { ThemedFadedView, ThemedIcon, ThemedView } from "./ThemedView";
import ProfilePicture from "./ProfilePicture";
import { ScrollView } from "react-native";
import { ThemedText } from "./ThemedText";
import { useAuth } from "@/context/AuthContext";
import {
  GetFollowers,
  GetFollowing,
  GetUserProfile,
} from "@/Services/userServices";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

type OptionType = {
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  title: string;
  handler: (param: any) => any;
};
const ShareSheet = () => {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState<DT_UserProfile | null>();
  const [suggestedContacts, setSuggestedContacts] = useState<DT_UserProfile[]>(
    []
  );
  const fetchUserProfile = async () => {
    if (currentUser) {
      const response = await GetUserProfile(currentUser.user_id);

      setUserProfile(response);
    }
  };

  const fetchSuggestedContacts = async () => {
    if (currentUser)
      try {
        const followers = await GetFollowers(currentUser.user_id);
        const following = await GetFollowing(currentUser.user_id);

        const combinedContacts = [
          ...followers,
          ...following.filter(
            (follow: any) =>
              !followers.some(
                (follower: any) => follower.user_id === follow.user_id
              )
          ),
        ];
        setSuggestedContacts(combinedContacts);
      } catch (error) {
        console.error("Error fetching suggested contacts:", error);
      }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchSuggestedContacts();
  }, [currentUser]);

  const data: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    color: string;
    handler: (param: any) => any;
  }[] = Array.from({ length: 10 }, (index) => ({
    icon: "add-circle",
    color: "white",
    title: "Right",
    handler: () => {},
  }));

  const options: OptionType[] = [
    {
      icon: "link-outline",
      title: "Copy Link",
      handler: () => {},
    },
    {
      icon: "bookmark-outline",
      title: "Bookmark",
      handler: () => {},
    },
    {
      icon: "download-outline",
      title: "Save Post",
      handler: () => {},
    },
    {
      icon: "chatbubble",
      title: "iMessages",
      handler: () => {},
    },
    {
      icon: "logo-instagram",
      title: "Instagram",
      handler: () => {},
    },
    {
      icon: "logo-facebook",
      title: "facebook",
      handler: () => {},
    },
    {
      icon: "logo-snapchat",
      title: "Snapchat",
      handler: () => {},
    },
    {
      icon: "logo-twitter",
      title: "Twitter",
      handler: () => {},
    },
    {
      icon: "alert-circle-outline",
      title: "Report",
      color: "tomato",
      handler: () => {},
    },
  ];

  return (
    <>
      <SearchBar onSearch={() => {}} style={{}} />
      <ThemedFadedView style={{ height: 1 }} />
      <View style={styles.optionContainer}>
        <FlatList
          data={options}
          renderItem={({ item }) => <OptionItem {...item} />}
          keyExtractor={(item) => item.title}
          horizontal
          style={styles.optionContainer}
          contentContainerStyle={styles.optionItems}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <ThemedFadedView style={{ height: 1 }} />
      <ScrollView bounces={false}>
        <View style={styles.userContainer}>
          {suggestedContacts.map((user) => (
            <UserItem key={user.user_id} user={user} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const UserItem = ({ user }: { user: DT_UserProfile }) => {
  return (
    <View style={styles.userItem}>
      <ProfilePicture imageUrl={user.profile_picture || ""} size={90} />
      <ThemedText style={styles.userItemText}>{user.username}</ThemedText>
    </View>
  );
};

const OptionItem = ({ icon, title, color, handler }: OptionType) => {
  const backgroundColor = useThemeColor(
    { light: "#ccc", dark: "#333" },
    "background"
  );

  const iconColor = color ? { color: color } : {};
  return (
    <TouchableOpacity onPress={handler} style={styles.optionItem}>
      <ThemedFadedView
        style={[
          styles.optionItemIcon,
          {
            borderColor: backgroundColor,
          },
        ]}
      >
        <ThemedIcon name={icon} size={40} {...iconColor} />
      </ThemedFadedView>
      <ThemedText style={styles.optionItemText}>{title}</ThemedText>
    </TouchableOpacity>
  );
};

export default ShareSheet;
const styles = StyleSheet.create({
  userContainer: {
    //backgroundColor: "pink",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 20,
    gap: "5%",
  },
  optionContainer: {
    //backgroundColor: "pink",
    //height: 100,
  },
  optionItems: {
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "center",
  },

  userItem: {
    height: 130,
    width: "30%",
    //backgroundColor: "pink",
    justifyContent: "space-around",
    alignItems: "center",
  },
  userItemText: {
    fontSize: 14,
  },

  optionItem: {
    height: 80,
    justifyContent: "space-around",
    alignItems: "center",
    //backgroundColor: "pink",
  },
  optionItemText: { fontSize: 12 },
  optionItemIcon: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 100,
  },
});
