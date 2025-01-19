import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Login from "./login";
import Register from "./register";

const AuthIndex: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      {isLogin ? <Login /> : <Register />}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Text>
        <Button
          title={isLogin ? "Register" : "Login"}
          onPress={() => setIsLogin(!isLogin)}
        />
      </View>
    </View>
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
