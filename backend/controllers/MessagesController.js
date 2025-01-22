import { db } from "../connect.js";

// --------------------- CHATS ---------------------
export const createChat = (req, res) => {
  const { participant_ids = [] } = req.body;
  const chat_type = participant_ids.length == 2 ? "one-to-one" : "group";
  // Step 1: Check if a one-on-one chat with the same participants already exists
  if (participant_ids.length == 2) {
    const checkChatQuery = `
      SELECT c.chat_id
      FROM Chats c
      JOIN ChatParticipants cp1 ON c.chat_id = cp1.chat_id
      JOIN ChatParticipants cp2 ON c.chat_id = cp2.chat_id
      WHERE c.chat_type = ?
        AND cp1.user_id = ?
        AND cp2.user_id = ?
    `;

    db.query(
      checkChatQuery,
      ["one-to-one", participant_ids[0], participant_ids[1]],
      (checkErr, existingChats) => {
        if (checkErr) return res.status(500).json(checkErr);

        // If a chat already exists, return the chat_id
        if (existingChats.length > 0) {
          return res.status(200).json({
            chat_id: existingChats[0].chat_id,
            message: "Chat already exists.",
          });
        }

        // If no chat exists, proceed to create a new chat
        createNewChat();
      }
    );
  } else {
    // For group chats, directly proceed to create a new chat
    createNewChat();
  }

  function createNewChat() {
    // Step 2: Create a new chat
    const createChatQuery = `
      INSERT INTO Chats (chat_type)
      VALUES (?)
    `;

    db.query(createChatQuery, [chat_type], (err, chatResult) => {
      if (err) return res.status(500).json(err);

      const chatId = chatResult.insertId;

      // Step 3: Add participants to the new chat
      const participantsQuery = `
        INSERT INTO ChatParticipants (chat_id, user_id, role)
        VALUES ?
      `;

      const values = participant_ids.map((user_id, index) => [
        chatId,
        user_id,
        chat_type === "group" ? (index === 0 ? "admin" : "member") : "none",
      ]);

      db.query(participantsQuery, [values], (participantErr) => {
        if (participantErr) return res.status(500).json(participantErr);

        return res.status(201).json({
          chat_id: chatId,
          message: "Chat created successfully.",
        });
      });
    });
  }
};

// Get all chats for a user
export const getChatsForUser = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT c.*, m.content AS last_message
    FROM Chats c
    LEFT JOIN Messages m ON c.last_message_id = m.message_id
    WHERE c.chat_id IN (
      SELECT chat_id FROM ChatParticipants WHERE user_id = ?
    ) ORDER BY updated_at DESC
  `;

  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Get chat details
export const getChatDetails = (req, res) => {
  const { chatId } = req.params;

  const query = `
    SELECT c.*, m.content AS last_message
    FROM Chats c
    LEFT JOIN Messages m ON c.last_message_id = m.message_id
    WHERE c.chat_id = ?
  `;

  db.query(query, [chatId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

// Delete a chat
export const deleteChat = (req, res) => {
  const { chatId } = req.params;

  const query = `
    DELETE FROM Chats WHERE chat_id = ?
  `;

  db.query(query, [chatId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Chat deleted successfully!");
  });
};

// Search for chats by keyword
export const searchChats = (req, res) => {
  const { keyword, userId } = req.query;

  const query = `
    SELECT c.*, m.content AS last_message
    FROM Chats c
    LEFT JOIN Messages m ON c.last_message_id = m.message_id
    WHERE c.chat_id IN (
      SELECT chat_id FROM ChatParticipants WHERE user_id = ?
    ) AND (
      c.chat_id LIKE ? OR m.content LIKE ?
    )
  `;

  db.query(query, [userId, `%${keyword}%`, `%${keyword}%`], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Get unread message count per chat
export const getUnreadCountByChat = (req, res) => {
  const { chatId } = req.params;

  const query = `
    SELECT COUNT(*) AS unread_count
    FROM Messages
    WHERE chat_id = ? AND is_read = FALSE
  `;

  db.query(query, [chatId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

// --------------------- CHAT PARTICIPANTS ---------------------

// Add a participant to a chat
export const addChatParticipant = (req, res) => {
  const { chat_id, user_id, role } = req.body;

  const query = `
    INSERT INTO ChatParticipants (chat_id, user_id, role)
    VALUES (?, ?, ?)
  `;

  db.query(query, [chat_id, user_id, role], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Chat participant added successfully!");
  });
};

// Remove a participant from a chat
export const removeChatParticipant = (req, res) => {
  const { chat_id, user_id } = req.body;

  const query = `
    DELETE FROM ChatParticipants
    WHERE chat_id = ? AND user_id = ?
  `;

  db.query(query, [chat_id, user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Chat participant removed successfully!");
  });
};

// Get all participants in a chat
export const getChatParticipants = (req, res) => {
  const { chatId } = req.params;

  const query = `
    SELECT cp.*, u.username, u.profile_picture
    FROM ChatParticipants cp
    JOIN Users u ON cp.user_id = u.user_id
    WHERE cp.chat_id = ?
  `;

  db.query(query, [chatId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Update a participant's role
export const updateParticipantRole = (req, res) => {
  const { chat_id, user_id, role } = req.body;

  const query = `
    UPDATE ChatParticipants
    SET role = ?
    WHERE chat_id = ? AND user_id = ?
  `;

  db.query(query, [role, chat_id, user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Participant role updated successfully!");
  });
};

// --------------------- MESSAGES ---------------------

// Send a message
export const sendMessage = (req, res) => {
  const { chat_id, sender_id, receiver_id, content, message_type } = req.body;

  const query = `
    INSERT INTO Messages (chat_id, sender_id, receiver_id, content, message_type)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [chat_id, sender_id, receiver_id, content, message_type],
    (err, data) => {
      if (err) return res.status(500).json(err);

      const updateChatQuery = `
        UPDATE Chats SET last_message_id = ?
        WHERE chat_id = ?
      `;

      db.query(updateChatQuery, [data.insertId, chat_id], (updateErr) => {
        if (updateErr) return res.status(500).json(updateErr);
        return res.status(201).json(data.insertId);
      });
    }
  );
};

// Get messages in a chat
export const getMessagesByChat = (req, res) => {
  const { chatId } = req.params;
  const { limit = 20, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM Messages
    WHERE chat_id = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(query, [chatId, parseInt(limit), parseInt(offset)], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// Mark a message as read
export const markMessageAsRead = (req, res) => {
  const { messageId } = req.params;

  const query = `
    UPDATE Messages SET is_read = TRUE
    WHERE message_id = ?
  `;

  db.query(query, [messageId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Message marked as read!");
  });
};

// Delete a message
export const deleteMessage = (req, res) => {
  const { messageId } = req.params;

  const query = `
    DELETE FROM Messages WHERE message_id = ?
  `;

  db.query(query, [messageId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Message deleted successfully!");
  });
};

// Search messages in a chat
export const searchMessagesInChat = (req, res) => {
  const { chatId, keyword } = req.query;

  const query = `
    SELECT * FROM Messages
    WHERE chat_id = ? AND content LIKE ?
    ORDER BY created_at DESC
  `;

  db.query(query, [chatId, `%${keyword}%`], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
