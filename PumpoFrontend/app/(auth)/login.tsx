import { useAuth } from "@/context/AuthContext";
import { LoginService } from "@/Services/authServices";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { generateLikesData } from "@/Services/RANDOMLIKESDATA";
import { generateRandomChatData } from "@/Services/RANDOMMESSAGEDATA";
import { generateRandomPostsAndInteractions } from "@/Services/RANDOMPOSTSDATA";
import { generateRandomExercises } from "@/Services/RANDOMEXERCISEDATA";
import { generateRandomWorkoutPlans } from "@/Services/RANDOMWORKOUTDATA";
import { addCommentsToAllPosts } from "@/Services/RANDOMCOMMENTDATA";
import { ThemedText, ThemedTextInput } from "@/components/ThemedText";

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    LoginService({ email, password })
      .then((res) => {
        signIn(res?.user);
        //Alert.alert("Login Successful", `Welcome back, ${res?.user.username}`);
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
        //Alert.alert("Login Successful", `Welcome back, ${res?.user.username}`);
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
      <ThemedText style={styles.title}>Login</ThemedText>
      <ThemedTextInput
        style={styles.input}
        borderWidth={1.5}
        borderDarkColor="#333"
        borderLightColor="#666"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <ThemedTextInput
        style={styles.input}
        borderWidth={1.5}
        borderDarkColor="#333"
        borderLightColor="#666"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.buttonContainers}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </TouchableOpacity>
      </View>

      <Button title="ADMIN" onPress={handleAdminLogin} />
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
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  buttonContainers: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: "#007bff",
  },
  buttonText: { color: "#eee", fontSize: 18 },
});

export default Login;
