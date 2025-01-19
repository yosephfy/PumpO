import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Settings: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text>Here you can manage your account settings.</Text>
    </View>
  );
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

export default Settings;
