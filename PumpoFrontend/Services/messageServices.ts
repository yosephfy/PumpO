import {
  getRequest,
  postRequest,
  deleteRequest,
  patchRequest,
} from "@/utility/axios";

// --------------------- CHATS ---------------------

// Create a new chat
export const CreateChat = async (chatData: { participant_ids: string[] }) => {
  try {
    const response = await postRequest("/messages/chats", chatData);
    const { chat_id } = response;
    return chat_id;
  } catch (error: any) {
    console.error("Error creating chat:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to create chat");
  }
};

// Get all chats for a user
export const GetChatsForUser = async (userId: string) => {
  try {
    const response = await getRequest(`/messages/chats/user/${userId}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching chats:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to fetch chats");
  }
};

// Get details of a specific chat
export const GetChatDetails = async (chatId: string) => {
  try {
    const response = await getRequest(`/messages/chats/${chatId}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching chat details:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch chat details"
    );
  }
};

// Delete a chat
export const DeleteChat = async (chatId: string) => {
  try {
    const response = await deleteRequest(`/messages/chats/${chatId}`);
    return response;
  } catch (error: any) {
    console.error("Error deleting chat:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to delete chat");
  }
};

// Search for chats by keyword
export const SearchChats = async (keyword: string, userId: string) => {
  try {
    const response = await getRequest(`/messages/chats/search`, {
      keyword,
      userId,
    });
    return response;
  } catch (error: any) {
    console.error("Error searching chats:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to search chats");
  }
};

// Get unread message count per chat
export const GetUnreadCountByChat = async (chatId: string) => {
  try {
    const response = await getRequest(`/messages/chats/${chatId}/unread-count`);
    return response.unread_count;
  } catch (error: any) {
    console.error("Error fetching unread count:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch unread count"
    );
  }
};

// --------------------- MESSAGES ---------------------

// Send a message
export const SendMessage = async (messageData: {
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  message_type: string;
}) => {
  try {
    const response = await postRequest("/messages/messages", messageData);
    return response;
  } catch (error: any) {
    console.error("Error sending message:", error.response || error);
    throw new Error(error.response?.data?.message || "Failed to send message");
  }
};

// Get messages for a specific chat (paginated)
export const GetMessagesByChat = async (params: {
  chatId: string;
  limit?: number;
  page?: number;
}) => {
  const { chatId, limit, page } = params;
  try {
    const response = await getRequest(`/messages/messages/chat/${chatId}`, {
      limit,
      page,
    });
    return response;
  } catch (error: any) {
    console.error("Error fetching messages:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch messages"
    );
  }
};

// Mark a specific message as read
export const MarkMessageAsRead = async (messageId: string) => {
  try {
    const response = await patchRequest(`/messages/messages/${messageId}/read`);
    return response;
  } catch (error: any) {
    console.error("Error marking message as read:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to mark message as read"
    );
  }
};

// Delete a message
export const DeleteMessage = async (messageId: string) => {
  try {
    const response = await deleteRequest(`/messages/messages/${messageId}`);
    return response;
  } catch (error: any) {
    console.error("Error deleting message:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to delete message"
    );
  }
};

// Search messages in a chat
export const SearchMessagesInChat = async (chatId: string, keyword: string) => {
  try {
    const response = await getRequest(
      `/messages/messages/chat/${chatId}/search`,
      {
        keyword,
      }
    );
    return response;
  } catch (error: any) {
    console.error("Error searching messages:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to search messages"
    );
  }
};

// --------------------- CHAT PARTICIPANTS ---------------------

// Add a participant to a chat
export const AddChatParticipant = async (participantData: {
  chat_id: string;
  user_id: string;
  role: string;
}) => {
  try {
    const response = await postRequest(
      `/messages/chat-participants`,
      participantData
    );
    return response;
  } catch (error: any) {
    console.error("Error adding chat participant:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to add participant"
    );
  }
};

// Remove a participant from a chat
export const RemoveChatParticipant = async (
  chat_id: string,
  user_id: string
) => {
  try {
    const response = await deleteRequest(`/messages/chat-participants`, {
      chat_id,
      user_id,
    });
    return response;
  } catch (error: any) {
    console.error("Error removing chat participant:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to remove participant"
    );
  }
};

// Get all participants in a chat
export const GetChatParticipants = async (chatId: string) => {
  try {
    const response = await getRequest(`/messages/chat-participants/${chatId}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching chat participants:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch participants"
    );
  }
};

// Update a participant's role
export const UpdateParticipantRole = async (participantData: {
  chat_id: string;
  user_id: string;
  role: string;
}) => {
  try {
    const response = await patchRequest(
      `/messages/chat-participants/role`,
      participantData
    );
    return response;
  } catch (error: any) {
    console.error("Error updating participant role:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to update participant role"
    );
  }
};

// --------------------- UTILITY FUNCTIONS ---------------------

// Mark all messages in a chat as read
export const MarkAllMessagesAsRead = async (messageIds: string[]) => {
  try {
    const responses = await Promise.all(
      messageIds.map((messageId) => MarkMessageAsRead(messageId))
    );
    return responses;
  } catch (error: any) {
    console.error(
      "Error marking all messages as read:",
      error.response || error
    );
    throw new Error(
      error.response?.data?.message || "Failed to mark all messages as read"
    );
  }
};

// Get all unread chats for a user
export const GetUnreadChatsForUser = async (userId: string) => {
  try {
    const chats = await GetChatsForUser(userId);
    const unreadChats = await Promise.all(
      chats.map(async (chat: any) => {
        const unreadCount = await GetUnreadCountByChat(chat.chat_id);
        return { ...chat, unread_count: unreadCount };
      })
    );
    return unreadChats;
  } catch (error: any) {
    console.error("Error fetching unread chats:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch unread chats"
    );
  }
};
