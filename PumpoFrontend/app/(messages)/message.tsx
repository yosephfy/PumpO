import ConversationPage from "@/Pages/MessagesPage/ConversationPage";
import { useGlobalSearchParams } from "expo-router";
import React from "react";

const MessageIndex: React.FC = () => {
  const params: any = useGlobalSearchParams();
  return <ConversationPage chatId={params.id} chat_type={params.chat_type} />;
};

export default MessageIndex;
