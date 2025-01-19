import { useAuth } from "@/context/AuthContext";
import { LoginService } from "@/Services/authServices";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { generateLikesData } from "@/Services/RANDOMLIKESDATA";
import { generateRandomChatData } from "@/Services/RANDOMMESSAGEDATA";
import { generateRandomPosts } from "@/Services/RANDOMPOSTSDATA";
import { generateRandomExercises } from "@/Services/RANDOMEXERCISEDATA";
import { generateRandomWorkoutPlans } from "@/Services/RANDOMWORKOUTDATA";

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    LoginService({ email, password })
      .then((res) => {
        signIn(res?.user);
        Alert.alert("Login Successful", `Welcome back, ${res?.user.username}`);
      })
      .catch((err) => {
        Alert.alert(
          "Login Failed",
          err.response?.data?.message || "An error occurred."
        );
      });
  };

  const handleAdminLogin = async () => {
    LoginService({ email: "test3@g.com", password: "12345" })
      .then((res) => {
        signIn(res?.user);
        Alert.alert("Login Successful", `Welcome back, ${res?.user.username}`);
        router.replace("/(app)");
      })
      .catch((err) => {
        Alert.alert(
          "Login Failed",
          err.response?.data?.message || "An error occurred."
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="ADMIN" onPress={handleAdminLogin} />
      <Button title="generate likes" onPress={() => generateLikesData(10000)} />
      <Button
        title="generate posts"
        onPress={() => generateRandomPosts(1000)}
      />
      <Button
        title="generate messages"
        onPress={() => generateRandomChatData(100, 50)}
      />
      <Button
        title="generate Exercises"
        onPress={() => generateRandomExercises(50)}
      />
      <Button
        title="generate Workouts"
        onPress={() => generateRandomWorkoutPlans(50, 7)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default Login;
