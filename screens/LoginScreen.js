import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import API from "../services/api";

export default function LoginScreen({
  setScreen,
  setProfile,
  setWater,
  setSleep,
  setMood,
  setHabits,
  setNutrition,
  setIsLoggedIn,
}) {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loadUserData = (user) => {
    setProfile({
      name: user.name || "",
      age: user.age || "",
      weight: user.weight || "",
      height: user.height || "",
      gender: user.gender || "",
      goal: user.goal || "",
    });

    setWater(user.water || 0);
    setSleep(user.sleep || "0h");
    setMood(user.mood || "");

    setHabits(
      user.habits || [
        { name: "Morning Walk", done: false },
        { name: "Drink Water", done: false },
        { name: "Meditation", done: false },
        { name: "Stretching", done: false },
      ]
    );

    setNutrition(
      user.nutrition || {
        calories: 1200,
        protein: 82,
        carbs: 180,
        fats: 52,
      }
    );
  };

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Required", "Please enter email and password.");
      return;
    }

    try {
      if (isRegister) {
        if (!name.trim()) {
          Alert.alert("Required", "Please enter your name.");
          return;
        }

        const response = await API.post("/auth/register", {
          name,
          email,
          password,
        });

        loadUserData(response.data.user);

        Alert.alert("Success", "Account created successfully.");
        await AsyncStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setScreen("profile");
      } else {
        const response = await API.post("/auth/login", {
          email,
          password,
        });

        loadUserData(response.data.user);

        Alert.alert("Success", "Login successful.");
        await AsyncStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setScreen("dashboard");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Authentication failed."
      );
    }
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <Text style={styles.logo}>🌿 Aurora</Text>

      <Text style={styles.authTitle}>
        {isRegister ? "Create your account" : "Welcome back"}
      </Text>

      {isRegister && (
        <TextInput
          placeholder="Name"
          placeholderTextColor="#94A3B8"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94A3B8"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleAuth}
      >
        <Text style={styles.primaryButtonText}>
          {isRegister ? "Create Account" : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsRegister(!isRegister)}
      >
        <Text style={styles.linkText}>
          {isRegister
            ? "Already have an account? Login"
            : "Create new account"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    backgroundColor: "#07152F",
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    fontSize: 42,
    color: "#4ADE80",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 18,
  },

  authTitle: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 28,
  },

  input: {
    backgroundColor: "#10203F",
    color: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    fontSize: 16,
  },

  primaryButton: {
    backgroundColor: "#4ADE80",
    padding: 17,
    borderRadius: 18,
    marginTop: 12,
  },

  primaryButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#07152F",
    fontSize: 17,
  },

  linkText: {
    color: "#4ADE80",
    textAlign: "center",
    marginTop: 18,
    fontSize: 15,
  },
});