import React from "react";
import { Stack } from "expo-router";

const CreateLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Create",
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack>
  );
};

export default CreateLayout;
