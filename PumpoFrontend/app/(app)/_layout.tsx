import { ThemedIcon, ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import {
  Stack,
  Tabs,
  useNavigation,
  usePathname,
  useRouter,
} from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const allowedRoutes = [
    "index",
    "(workout)",
    "create_redirect",
    "(pulse)",
    "(my_profile)",
  ]; // Specify allowed routes

  const filteredRoutes = state.routes.filter((route: any) =>
    allowedRoutes.includes(route.name)
  );

  return (
    <ThemedView>
      <SafeAreaView style={styles.tabBar}>
        {filteredRoutes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          let iconName: any = "ellipse";

          switch (route.name) {
            case "index":
              iconName = "home-outline";
              break;
            case "(workout)":
              iconName = "barbell-outline";
              break;
            case "create_redirect":
              iconName = "add-circle-outline";
              break;
            case "(pulse)":
              iconName = "play-outline";
              break;
            case "(my_profile)":
              iconName = "person-circle-outline";
              break;
            default:
              iconName = "ellipse";
          }

          const handlePress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          const iconColor = isFocused ? { color: "#007BFF" } : {};
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabButton}
              onPress={handlePress}
            >
              <ThemedIcon
                name={iconName}
                size={28}
                //color={isFocused ? "#007BFF" : "#888"}
                {...iconColor}
              />
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    </ThemedView>
  );
};

const AppLayout: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const navigation = useNavigation();
  const pathname: any = usePathname();
  const backgroundColor: any = useThemeColor({}, "background");
  const titleColor: any = useThemeColor({}, "text");

  useEffect(() => {
    setIsMounted(true); // Ensure the layout is mounted
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace("/(auth)");
    }
  }, [isMounted, isAuthenticated, router]);

  if (!isMounted) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Redirecting...</Text>
      </View>
    );
  }

  return (
    <>
      <Tabs
        screenListeners={{
          tabPress: (e) => {
            /*  if (navigation.isFocused()) {
            router.replace(pathname); // Reload the page if already focused
          } */
          },
        }}
        tabBar={(props) => <CustomTabBar {...props} />} // Use Custom Tab Bar
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.container,
          sceneStyle: styles.sceneStyle,
          animation: "shift",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Pump0",
            tabBarLabel: "Home",
            headerShown: true,
            headerStyle: { backgroundColor },
            headerTitleStyle: { color: titleColor },
            headerRight: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* Explore Icon */}
                <TouchableOpacity onPress={() => router.push("/(explore)")}>
                  <ThemedIcon
                    name="search-outline"
                    size={24}
                    style={{ marginRight: 16 }}
                  />
                </TouchableOpacity>
                {/* Messages Icon */}
                <TouchableOpacity onPress={() => router.push("/(messages)")}>
                  <ThemedIcon
                    name="chatbubbles-outline"
                    size={24}
                    style={{ marginRight: 16 }}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="(workout)"
          options={{
            title: "Workout",
            tabBarLabel: "Workout",
          }}
        />
        <Tabs.Screen
          name="create_redirect"
          options={{
            title: "Create",
            tabBarLabel: "Create",
          }}
        />
        <Tabs.Screen
          name="(pulse)"
          options={{
            title: "Pulse",
            tabBarLabel: "Pulse",
          }}
        />
        <Tabs.Screen
          name="(my_profile)"
          options={{
            title: "Profile",
            tabBarLabel: "Profile",
          }}
        />
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    //backgroundColor: "#fff",
    //borderTopWidth: 0.5,
    borderTopColor: "#bbb",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 10,
    color: "#888",
    marginTop: 4,
  },
  activeTabLabel: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  container: { paddingTop: 5, height: 80 },
  sceneStyle: {},
});

export default AppLayout;
