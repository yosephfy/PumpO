import { ThemedText, ThemedTextInput } from "@/components/ThemedText";
import { RegisterService } from "@/Services/authServices";
import { useRouter } from "expo-router";
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

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleRegister = async () => {
    RegisterService({ username, email, password })
      .then(() => {
        Alert.alert("Registration Successful", `Redirecting to Login Page`);
        router.replace("/(auth)/login");
      })
      .catch((err) => {
        Alert.alert(
          "Registration Failed",
          err.response?.data?.message || "An error occurred."
        );
      });
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Register</ThemedText>
      <ThemedTextInput
        style={styles.input}
        borderWidth={1.5}
        borderDarkColor="#333"
        borderLightColor="#666"
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize="none"
      />
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <ThemedText style={styles.buttonText}>Register</ThemedText>
        </TouchableOpacity>
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

export default Register;
