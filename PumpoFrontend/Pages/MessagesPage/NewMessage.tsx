import ProfilePicture from "@/components/ProfilePicture";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchUsers } from "@/Services/userServices";
import { GetFollowers, GetFollowing } from "@/Services/userServices";
import { router } from "expo-router";
import SelectableFlatList from "@/components/SelectableFlatList";
import { Ionicons } from "@expo/vector-icons";
import {
  CreateChat,
  GetChatDetails,
  GetChatParticipants,
} from "@/Services/messageServices";
import { timeAgo } from "@/utility/utilities";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";

const NewMessage = ({ userId }: { userId: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState<any[]>([]);
  const [suggestedContacts, setSuggestedContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  useEffect(() => {
    const fetchSuggestedContacts = async () => {
      try {
        setLoading(true);
        const followers = await GetFollowers(userId);
        const following = await GetFollowing(userId);

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
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedContacts();
  }, [userId]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.trim().length > 0) {
      try {
        setLoading(true);
        const results = await SearchUsers({ query: query, limit: 10, page: 1 });
        setContacts(results);
      } catch (error) {
        console.error("Error searching users:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setContacts([]);
    }
  };

  const handleContactSelect = (selectedIds: any[]) => {
    setSelectedIds(selectedIds);
  };

  const getOtherParticipantId = (participants: any[]) => {
    return participants.filter((x) => x.user_id !== userId);
  };

  const handleStartChat = async () => {
    openMessage({ participants: selectedIds, userId });
  };

  const renderContactItem = (item: any) => (
    <View style={styles.contactItem}>
      <ProfilePicture imageUrl={item.profile_picture} size={30} />
      <ThemedText style={styles.contactItemLabel}>{item.username}</ThemedText>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ThemedView style={styles.container}>
        <View style={styles.toContainer}>
          <ThemedText type="title" style={styles.toLabel}>
            To:
          </ThemedText>
          <SearchBar
            onSearch={handleSearch}
            onChangeText={handleSearch}
            style={{ flex: 1 }}
          />
        </View>

        {searchQuery.trim().length > 0 ? (
          <SelectableFlatList
            data={contacts.map((x) => ({ ...x, id: x.user_id }))}
            onSelectionChange={handleContactSelect}
            renderItem={renderContactItem}
            containerStyle={styles.contactListContainer}
            itemStyle={styles.contactItem}
          />
        ) : (
          <>
            <ThemedText type="subtitle" style={styles.suggestedLabel}>
              Suggested
            </ThemedText>
            <SelectableFlatList
              data={suggestedContacts.map((x) => ({ ...x, id: x.user_id }))}
              onSelectionChange={handleContactSelect}
              renderItem={renderContactItem}
              containerStyle={styles.contactListContainer}
              itemStyle={styles.contactItem}
            />
          </>
        )}

        {selectedIds.length > 0 && (
          <SafeAreaView>
            <TouchableOpacity
              style={styles.startChatButton}
              onPress={handleStartChat}
            >
              <Text style={styles.startChatLabel}>Start Chat</Text>
              <Ionicons name="paper-plane-outline" color="#fff" size={20} />
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </ThemedView>
    </KeyboardAvoidingView>
  );
};
export const openMessage = async ({
  userId,
  participants,
}: {
  participants: string[];
  userId: string;
}) => {
  const getOtherParticipantId = (participants: any[], userId: string) => {
    return participants.filter((x) => x.user_id !== userId);
  };
  console.log("yurr");
  try {
    const chat_id = await CreateChat({
      participant_ids: [userId, ...participants],
    });

    const chat = await GetChatDetails(chat_id);

    const enrichedMessages = async () => {
      const chatParticipants = await GetChatParticipants(chat.chat_id);
      const otherUsers = getOtherParticipantId(chatParticipants, userId);

      const userProfile =
        chat.chat_type === "group"
          ? {
              chat_name: otherUsers.map((x) => x.username).toString(),
              profile_picture: otherUsers.map((x) => x.profile_picture),
            }
          : {
              chat_name: otherUsers[0].username,
              profile_picture: otherUsers.map((x) => x.profile_picture),
            };

      return {
        id: chat.chat_id,
        ...userProfile,
        latest_message: chat.last_message || "No messages yet",
        timestamp: timeAgo(chat.updated_at).short,
        is_read: chat.is_read || false,
        chat_type: chat.chat_type,
      };
    };

    const chatObj: DT_ChatItem | any = await enrichedMessages();
    router.push({
      pathname: "/(messages)/message",
      params: chatObj,
    });
  } catch (error) {
    console.error("Error starting chat:", error);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
  },
  toContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    //borderBottomWidth: 1,
    //borderBottomColor: "#ddd",
    //backgroundColor: "#f5f5f5",
  },
  toLabel: {
    fontSize: 16,
    //fontWeight: "bold",
    //color: "#333",
    marginRight: 5,
    marginLeft: 5,
  },
  suggestedLabel: {
    fontSize: 16,
    //fontWeight: "bold",
    //color: "#555",
    marginVertical: 10,
    marginLeft: 10,
  },
  contactListContainer: {
    paddingVertical: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 8,
  },
  contactItemLabel: {
    fontSize: 15,
    fontWeight: "500",
    //color: "#444",
  },
  startChatButton: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    width: "80%",
    height: 50,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 50,
    gap: 12,
    justifyContent: "center",
  },
  startChatLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default NewMessage;
