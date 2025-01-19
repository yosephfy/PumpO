import React from "react";
import { Stack } from "expo-router";

const ExploreLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Explore", headerShown: false }}
      />
    </Stack>
  );
};

export default ExploreLayout;
