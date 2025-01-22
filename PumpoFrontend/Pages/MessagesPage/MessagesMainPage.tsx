import ProfilePicture from "@/components/ProfilePicture";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GetChatParticipants,
  GetChatsForUser,
  GetUnreadCountByChat,
} from "@/Services/messageServices";
import { timeAgo } from "@/utility/utilities";
import GroupProfilePicture from "@/components/GroupProfilePicture";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const MessagesMainPage = ({
  userId,
  param,
}: {
  userId: string;
  param: any;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<DT_ChatItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getOtherParticipantId = (participants: any[]) => {
    return participants.filter((x) => x.user_id !== userId);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const chats = await GetChatsForUser(userId);
        const enrichedMessages: DT_ChatItem[] = await Promise.all(
          chats.map(async (chat: any) => {
            const chat_participants: any[] = await GetChatParticipants(
              chat.chat_id
            );
            const other_users = getOtherParticipantId(chat_participants);
            const is_read = await GetUnreadCountByChat(chat.chat_id);
            const user_profile =
              chat.chat_type === "group"
                ? {
                    chat_name: other_users.map((x) => x.username).join(", "),
                    profile_picture: other_users.map((x) => x.profile_picture),
                  }
                : {
                    chat_name: other_users[0].username,
                    profile_picture: other_users.map((x) => x.profile_picture),
                  };

            return {
              id: chat.chat_id,
              ...user_profile,
              latest_message: chat.last_message || "No messages yet",
              timestamp: timeAgo(chat.updated_at).short,
              is_read: is_read == 0 || false,
              chat_type: chat.chat_type,
            };
          })
        );

        setMessages(enrichedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId, param]);

  const handleClickMessage = (obj: DT_ChatItem) => {
    router.push({
      pathname: "/(messages)/message",
      params: obj as any,
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const renderMessageItem = ({ item }: { item: DT_ChatItem }) => (
    <TouchableOpacity
      //style={[styles.messageItem, !item.is_read && styles.unreadMessageItem]}
      onPress={() => handleClickMessage(item)}
    >
      <ThemedView
        style={[
          { flex: 1 },
          styles.messageItem,
          !item.is_read && styles.unreadMessageItem,
        ]}
      >
        <View style={styles.profilePicture}>
          {item.chat_type === "group" && Array.isArray(item.profile_picture) ? (
            <GroupProfilePicture imageUrl={item.profile_picture} size={50} />
          ) : (
            <ProfilePicture imageUrl={item.profile_picture[0]} size={50} />
          )}
        </View>
        <View style={styles.messageContent}>
          <View style={styles.chatNameContainer}>
            {!item.is_read && <View style={styles.unreadDot} />}
            <ThemedText
              style={[styles.chatName, !item.is_read && styles.unreadChatName]}
              numberOfLines={1}
            >
              {item.chat_name}
            </ThemedText>
          </View>
          <ThemedText
            darkColor="#888"
            lightColor="#999"
            style={styles.latestMessage}
            numberOfLines={1}
          >
            {item.latest_message}
          </ThemedText>
        </View>
        <ThemedText darkColor="#aaa" lightColor="#999" style={styles.timestamp}>
          {item.timestamp}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedFadedView style={styles.container}>
      <SearchBar onSearch={handleSearch} style={{ marginHorizontal: 10 }} />
      <FlatList
        data={messages.filter((msg) =>
          msg.chat_name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContainer}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.loadingText}>Loading chats...</Text>
          ) : (
            <Text style={styles.noChatsText}>No chats found</Text>
          )
        }
      />
    </ThemedFadedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
  },
  messageList: {
    flex: 1,
  },
  messageListContainer: {
    paddingVertical: 10,
    gap: 1,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    //borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  unreadMessageItem: {
    //backgroundColor: "#f9f9f9",
  },
  profilePicture: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  chatNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007BFF",
    marginRight: 5,
  },
  chatName: {
    width: "90%",
    fontSize: 16,
    marginBottom: 2,
    //color: "#333",
  },
  unreadChatName: {
    fontWeight: "500",
  },
  latestMessage: {
    fontSize: 14,
    //color: "#888",
  },
  timestamp: {
    fontSize: 12,
    //color: "#aaa",
    marginLeft: 10,
  },
  loadingText: {
    textAlign: "center",
    color: "#aaa",
    marginVertical: 20,
  },
  noChatsText: {
    textAlign: "center",
    //color: "#888",
    marginVertical: 20,
  },
});

export default MessagesMainPage;
