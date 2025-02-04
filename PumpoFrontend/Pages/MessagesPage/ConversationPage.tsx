import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  GetMessagesByChat,
  MarkAllMessagesAsRead,
  MarkMessageAsRead,
  SendMessage,
} from "@/Services/messageServices";
import { GetChatParticipants } from "@/Services/messageServices";
import { timeAgo } from "@/utility/utilities";
import { useAuth } from "@/context/AuthContext";
import { MainTabBarHeight } from "@/constants/DimensionsConstants";
import ProfilePicture from "@/components/ProfilePicture";
import MessageInput from "@/components/MessageInput";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useInfiniteQuery } from "@tanstack/react-query";
type MessageType = {
  message_id: string;
  content: string;
  created_at: string;
  sender_id: string;
  profile_picture?: string;
  sender: string;
  username: string;
};
const ConversationPage = ({
  chatId,
  chat_type,
}: {
  chatId: string;
  chat_type: string;
}) => {
  const { currentUser } = useAuth();
  const flatListRef = useRef<FlatList>(null);
  const [newMessage, setNewMessage] = useState("");

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage: hasMore,
    isFetchingNextPage: loading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["chatMessages", chatId],
    queryFn: async ({ pageParam = 1 }) => {
      const fetchedMessages = await GetMessagesByChat({
        chatId,
        limit: 20,
        page: pageParam,
      });

      await MarkAllMessagesAsRead(
        fetchedMessages.map((x: any) => x.message_id)
      );

      const chatParticipants = await GetChatParticipants(chatId);

      const enrichedMessages = fetchedMessages.map((msg: any) => {
        const sender = chatParticipants.find(
          (participant: any) => participant.user_id === msg.sender_id
        );
        return {
          message_id: msg.message_id,
          content: msg.content,
          created_at: timeAgo(msg.created_at).long,
          sender_id: msg.sender_id,
          profile_picture: sender?.profile_picture || "",
          sender:
            sender?.user_id === currentUser?.user_id
              ? "current_user"
              : "other_user",
          username: sender?.username,
        };
      });

      return {
        messages: enrichedMessages,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.messages.length === 20 ? lastPage.currentPage + 1 : undefined,
    initialPageParam: 1,
  });

  const messages = messagesData?.pages.flatMap((page) => page.messages) || [];

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
  };

  const handleSendMessage = async () => {
    if (currentUser && newMessage.trim()) {
      try {
        const msg_id = await SendMessage({
          chat_id: chatId,
          sender_id: currentUser.user_id,
          content: newMessage,
          message_type: "text",
        });
        await MarkMessageAsRead(msg_id);
        refetch();
        setNewMessage("");
        setTimeout(scrollToBottom, 200);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const renderMessageItem = ({ item }: { item: MessageType }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "other_user"
          ? styles.otherUserMessage
          : styles.currentUserMessage,
        chat_type === "group" ? { marginBottom: 20 } : {},
      ]}
    >
      {item.sender === "other_user" && (
        <View style={styles.profilePicture}>
          <ProfilePicture imageUrl={item.profile_picture || ""} size={40} />
        </View>
      )}

      <ThemedFadedView
        lightColor="#f0f0f0"
        style={[
          styles.messageBubble,
          item.sender === "other_user"
            ? styles.otherUserMessageBubble
            : styles.currentUserMessageBubble,
        ]}
      >
        <ThemedText
          style={[
            styles.messageText,
            item.sender === "other_user"
              ? styles.otherMessageText
              : styles.currentMessageText,
          ]}
        >
          {item.content}
        </ThemedText>
        <ThemedText lightColor="#eee" darkColor="#bbb" style={styles.timestamp}>
          {item.created_at}
        </ThemedText>
        {item.sender === "other_user" && chat_type === "group" && (
          <ThemedText
            lightColor="#999"
            darkColor="#bbb"
            style={styles.usernameLabel}
          >
            {item.username}
          </ThemedText>
        )}
      </ThemedFadedView>
    </View>
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={styles.container}
      >
        {messages.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.message_id}
            renderItem={renderMessageItem}
            onEndReached={() => {
              if (hasMore && !loading) {
                fetchNextPage();
              }
            }}
            ListHeaderComponent={
              loading ? (
                <ActivityIndicator
                  size="small"
                  color="#007BFF"
                  style={styles.loader}
                />
              ) : null
            }
            onEndReachedThreshold={0.1}
            inverted
            showsVerticalScrollIndicator={false}
            style={styles.chatList}
            contentContainerStyle={styles.chatListContainer}
          />
        ) : (
          <View style={styles.emptyMessageContainer}>
            <Text style={styles.emptyMessageText}>Start a chat!!</Text>
          </View>
        )}
        <SafeAreaView>
          <MessageInput
            value={newMessage}
            onChangeText={setNewMessage}
            onSend={handleSendMessage}
            style={{ paddingHorizontal: 10 }}
            autoFocus
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    height: Dimensions.get("window").height - MainTabBarHeight,
  },
  chatList: { flex: 1 },
  chatListContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  currentUserMessage: {
    justifyContent: "flex-end",
  },
  otherUserMessage: {
    justifyContent: "flex-start",
  },
  profilePicture: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    alignSelf: "flex-start",
  },
  messageBubble: {
    maxWidth: "70%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  currentUserMessageBubble: {
    backgroundColor: "#007BFF",
    borderTopRightRadius: 0,
  },
  otherUserMessageBubble: {
    //backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 14,
    //color: "#333",
  },
  otherMessageText: {
    fontSize: 14,
    //color: "#333",
  },
  currentMessageText: {
    fontSize: 14,
    color: "#fff",
  },
  timestamp: {
    fontSize: 10,
    //color: "#bbb",
    marginTop: 5,
    textAlign: "right",
  },
  usernameLabel: {
    position: "absolute",
    fontSize: 10,
    //color: "#bbb",
    textAlign: "right",
    bottom: -13,
    left: 5,
  },
  loader: {
    marginVertical: 10,
  },
  emptyMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessageText: { fontSize: 20, fontWeight: "500", color: "#777" },
});

export default ConversationPage;
