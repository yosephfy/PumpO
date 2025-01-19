import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(app)"
            options={{
              headerShown: false,
              title: "Home",
            }}
          />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(full_post)"
            options={{
              headerShown: false,
              title: "Post",
              headerBackButtonDisplayMode: "minimal",
            }}
          />
          <Stack.Screen
            name="(explore)"
            options={{
              headerShown: false,
              title: "Explore",
              headerBackButtonDisplayMode: "minimal",
            }}
          />
          <Stack.Screen
            name="(messages)"
            options={{
              headerShown: false,
              title: "Messages",
              headerBackButtonDisplayMode: "minimal",
            }}
          />
          <Stack.Screen
            name="(create)"
            options={{
              headerShown: false,
              title: "Create",
              headerBackButtonDisplayMode: "minimal",
              presentation: "containedTransparentModal",
            }}
          />
          <Stack.Screen
            name="comment"
            options={{
              title: "Comments",
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="(feed)"
            options={{
              title: "Feed",
              headerShown: false,
            }}
          />
        </Stack>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
