import React from "react";
import { Stack } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

const WorkoutLayout: React.FC = () => {
  const backgroundColor: any = useThemeColor({}, "background");
  const titleColor: any = useThemeColor({}, "text");

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor },
        headerTitleStyle: { color: titleColor },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Workout", headerShown: true }}
      />
      <Stack.Screen
        name="workout"
        options={{ title: "Workout", headerShown: true }}
      />
    </Stack>
  );
};

export default WorkoutLayout;
