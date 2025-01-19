import { View, Text, RefreshControl } from "react-native";
import React, { useState } from "react";
import { useNavigation, usePathname, useRouter } from "expo-router";

type Props = {};

const RefreshControllComponent = (props: Props) => {
  const navigation = useNavigation();
  const router = useRouter();
  const pathname = usePathname();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      let routeName: any = pathname;
      if (navigation.isFocused()) {
        router.replace(routeName); // Reload the page if already focused
      }
    } catch (error) {
      console.error("Failed to refresh profile:", error);
    } finally {
      setRefreshing(false);
    }
  };
  return <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;
};

export default RefreshControllComponent;
