import { useAuth } from "@/context/AuthContext";
import NewMessage from "@/Pages/MessagesPage/NewMessage";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const MessageIndex: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  if (currentUser) return <NewMessage userId={currentUser.user_id} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default MessageIndex;
