import { Stack } from "expo-router";
import React from "react";
import { Dimensions } from "react-native";

const FeedLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Feed",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default FeedLayout;
