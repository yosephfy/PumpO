import CreateMedia from "@/Pages/CreateContentPage/CreateMedia";
import { Redirect, router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CreateIndex: React.FC = () => {
  return <CreateMedia />;
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

export default CreateIndex;
