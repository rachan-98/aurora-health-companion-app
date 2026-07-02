import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";

import API from "../services/api";

export default function ProfileScreen({
  profile,
  setProfile,
  setScreen,
  water,
  sleep,
  mood,
  habits,
}) {
  const bmi =
    profile.weight && profile.height
      ? (
          Number(profile.weight) /
          Math.pow(Number(profile.height) / 100, 2)
        ).toFixed(1)
      : "--";

  const bmiStatus =
    bmi === "--"
      ? "Enter details"
      : bmi < 18.5
      ? "Underweight"
      : bmi < 25
      ? "Healthy"
      : bmi < 30
      ? "Overweight"
      : "Obese";

  const calories =
    profile.weight && profile.height && profile.age
      ? Math.round(
          10 * Number(profile.weight) +
            6.25 * Number(profile.height) -
            5 * Number(profile.age) +
            5
        )
      : "--";

  const saveProfileToMongoDB = async () => {
    try {
      await API.post("/user/save", {
        ...profile,
        water,
        sleep,
        mood,
        habits,
      });

      Alert.alert("Success", "Profile saved successfully.");
      setScreen("dashboard");
    } catch (error) {
      console.log("Profile save error:", error.response?.data || error.message);
      Alert.alert(
        "Save Failed",
        "Could not save profile to MongoDB. Check backend and WiFi."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <Text style={styles.logo}>🌿 Aurora</Text>

        <Text style={styles.title}>Your Health Profile</Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#94A3B8"
          value={profile.name}
          onChangeText={(text) =>
            setProfile({ ...profile, name: text })
          }
          style={styles.input}
        />

        <TextInput
          placeholder="Age"
          placeholderTextColor="#94A3B8"
          value={profile.age}
          onChangeText={(text) =>
            setProfile({ ...profile, age: text })
          }
          keyboardType="number-pad"
          style={styles.input}
        />

        <TextInput
          placeholder="Weight (kg)"
          placeholderTextColor="#94A3B8"
          value={profile.weight}
          onChangeText={(text) =>
            setProfile({ ...profile, weight: text })
          }
          keyboardType="number-pad"
          style={styles.input}
        />

        <TextInput
          placeholder="Height (cm)"
          placeholderTextColor="#94A3B8"
          value={profile.height}
          onChangeText={(text) =>
            setProfile({ ...profile, height: text })
          }
          keyboardType="number-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Gender</Text>

        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              profile.gender === "Male" &&
                styles.selectedOption,
            ]}
            onPress={() =>
              setProfile({
                ...profile,
                gender: "Male",
              })
            }
          >
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              profile.gender === "Female" &&
                styles.selectedOption,
            ]}
            onPress={() =>
              setProfile({
                ...profile,
                gender: "Female",
              })
            }
          >
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Health Goal</Text>

        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              profile.goal === "Lose Weight" &&
                styles.selectedOption,
            ]}
            onPress={() =>
              setProfile({
                ...profile,
                goal: "Lose Weight",
              })
            }
          >
            <Text style={styles.optionText}>Lose Weight</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              profile.goal === "Build Muscle" &&
                styles.selectedOption,
            ]}
            onPress={() =>
              setProfile({
                ...profile,
                goal: "Build Muscle",
              })
            }
          >
            <Text style={styles.optionText}>Build Muscle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              profile.goal === "Stay Healthy" &&
                styles.selectedOption,
            ]}
            onPress={() =>
              setProfile({
                ...profile,
                goal: "Stay Healthy",
              })
            }
          >
            <Text style={styles.optionText}>Healthy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Health Insights</Text>

          <Text style={styles.info}>BMI: {bmi}</Text>
          <Text style={styles.info}>Status: {bmiStatus}</Text>
          <Text style={styles.info}>
            Estimated Calories: {calories}
          </Text>
          <Text style={styles.info}>
            Gender: {profile.gender || "--"}
          </Text>
          <Text style={styles.info}>
            Goal: {profile.goal || "--"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={saveProfileToMongoDB}
        >
          <Text style={styles.buttonText}>
            Save & Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07152F",
    padding: 24,
  },

  logo: {
    color: "#4ADE80",
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#10203F",
    color: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    fontSize: 16,
  },

  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },

  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },

  optionButton: {
    backgroundColor: "#10203F",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginRight: 10,
    marginBottom: 10,
  },

  selectedOption: {
    borderWidth: 2,
    borderColor: "#4ADE80",
  },

  optionText: {
    color: "white",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#10203F",
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  info: {
    color: "#CBD5E1",
    fontSize: 16,
    marginBottom: 8,
  },

  button: {
    backgroundColor: "#4ADE80",
    padding: 18,
    borderRadius: 18,
    marginBottom: 40,
  },

  buttonText: {
    color: "#07152F",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
});