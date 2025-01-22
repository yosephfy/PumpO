import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet } from "react-native";
import Login from "./login";
import Register from "./register";

const AuthIndex: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <ThemedView style={styles.container}>
      {isLogin ? <Login /> : <Register />}
      <SafeAreaView style={styles.toggleContainer}>
        <ThemedText style={styles.toggleText} darkColor="#aaa">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </ThemedText>
        <Button
          title={isLogin ? "Register" : "Login"}
          onPress={() => setIsLogin(!isLogin)}
        />
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  toggleContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  toggleText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default AuthIndex;
