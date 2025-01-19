import { Stack } from "expo-router";
import React from "react";
import { Dimensions } from "react-native";

const ShortsLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Pulse",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ShortsLayout;
