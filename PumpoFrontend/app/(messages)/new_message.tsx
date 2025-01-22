import { useAuth } from "@/context/AuthContext";
import NewMessage from "@/Pages/MessagesPage/NewMessage";
import React from "react";

const MessageIndex: React.FC = () => {
  const { currentUser } = useAuth();
  if (currentUser) return <NewMessage userId={currentUser.user_id} />;
};

export default MessageIndex;
