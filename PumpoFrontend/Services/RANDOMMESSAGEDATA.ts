import {
  CreateChat,
  AddChatParticipant,
  SendMessage,
} from "@/Services/messageServices";
import { GetAllUsers } from "@/Services/userServices"; // Assuming GetUsers fetches all users

/**
 * Generate random chat data with messages
 * @param numChats - Number of chats to generate
 * @param maxMessagesPerChat - Maximum number of messages per chat
 */
export const generateRandomChatData = async (
  numChats: number,
  maxMessagesPerChat: number
) => {
  try {
    // Fetch all users
    const users = await GetAllUsers();
    if (!users || users.length < 2) {
      console.error("Not enough users to generate chats.");
      return;
    }

    for (let i = 0; i < numChats; i++) {
      // Select random participants for the chat
      const participantCount = Math.random() < 0.5 ? getRandomInt(2, 5) : 2; // Between 2 and 5 participants
      const participants = Array.from(
        { length: participantCount },
        () => users[getRandomInt(0, users.length - 1)]
      );

      // Ensure unique participants
      const uniqueParticipants = Array.from(
        new Set(participants.map((p) => p.user_id))
      );

      // Create the chat
      const chatType = uniqueParticipants.length > 2 ? "group" : "one-to-one";
      const chatData = {
        chat_type: chatType,
        participant_ids: uniqueParticipants,
      };
      const chatResponse = await CreateChat(chatData);
      const chatId = chatResponse.chat_id;

      console.log(
        `Chat created: ${chatId} with participants: [${uniqueParticipants}]`
      );

      /* // Add participants to the chat
      for (const participantId of uniqueParticipants) {
        const role =
          chatType === "group" && uniqueParticipants[0] === participantId
            ? "admin"
            : "member";
        await AddChatParticipant({
          chat_id: chatId,
          user_id: participantId,
          role,
        });
      } */

      // Generate random messages for the chat
      const numMessages = getRandomInt(1, maxMessagesPerChat);
      for (let j = 0; j < numMessages; j++) {
        const sender =
          uniqueParticipants[getRandomInt(0, uniqueParticipants.length - 1)];
        const receiver =
          uniqueParticipants[getRandomInt(0, uniqueParticipants.length - 1)];

        // Ensure sender and receiver are not the same
        if (sender === receiver) continue;

        const messageContent = `This is a random message #${j + 1}`;
        const messageType = "text"; // 80% text, 20% media

        await SendMessage({
          chat_id: chatId,
          sender_id: sender,
          receiver_id: receiver,
          content: messageContent,
          message_type: messageType,
        });

        // console.log(`Message sent in chat ${chatId}: "${messageContent}"`);
      }
    }

    console.log(
      `Successfully generated ${numChats} chats with random messages.`
    );
  } catch (error: any) {
    console.error("Error generating chat data:", error.message);
  }
};

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
