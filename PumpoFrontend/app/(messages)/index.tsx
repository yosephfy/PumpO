import { useAuth } from "@/context/AuthContext";
import MessagesMainPage from "@/Pages/MessagesPage/MessagesMainPage";
import { useGlobalSearchParams } from "expo-router";
import React from "react";

const Messages: React.FC = () => {
  const { currentUser } = useAuth();
  const param = useGlobalSearchParams();
  if (currentUser)
    return <MessagesMainPage userId={currentUser.user_id} param={param} />;
};

export default Messages;
