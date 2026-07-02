import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";

function BottomNav({ setScreen }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => setScreen("dashboard")}>
        <Text style={styles.navItem}>🏠</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("hydration")}>
        <Text style={styles.navItem}>💧</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("sleep")}>
        <Text style={styles.navItem}>😴</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("habits")}>
        <Text style={styles.navItem}>✅</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("ai")}>
        <Text style={styles.navItem}>🤖</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("settings")}>
        <Text style={styles.navItem}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function SettingsScreen({
  setScreen,
  setWater,
  setSleep,
  setMood,
  setHabits,
  setNutrition,
  setIsLoggedIn,
}) {
  const resetData = () => {
    Alert.alert("Reset Data", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Reset",
        onPress: async () => {
          await AsyncStorage.removeItem("auroraData");

          setWater(0);
          setSleep("0h");
          setMood("");

          setHabits([
            { name: "Morning Walk", done: false },
            { name: "Drink Water", done: false },
            { name: "Meditation", done: false },
            { name: "Stretching", done: false },
          ]);
          setNutrition({
  calories: 1200,
  protein: 82,
  carbs: 180,
  fats: 52,
});
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <Text style={styles.heading}>⚙️ Settings</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => setScreen("profile")}
        >
          <Text style={styles.cardTitle}>👤 Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌙 Dark Theme</Text>
          <Text style={styles.cardSub}>Enabled</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔔 Notifications</Text>
          <Text style={styles.cardSub}>
            Water, sleep, and habit reminders are enabled.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>ℹ️ About Aurora</Text>
          <Text style={styles.cardSub}>
            Aurora AI Powered Health Companion
          </Text>
        </View>




        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetData}
        >
          <Text style={styles.resetText}>Reset All Data</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={styles.logoutButton}
  onPress={async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setScreen("login");
  }}
>
  <Text style={styles.logoutText}>
    Logout
  </Text>
</TouchableOpacity>

      </ScrollView>

      <BottomNav setScreen={setScreen} />
    </SafeAreaView>

    
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#07152F",
    padding: 20,
  },

  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#10203F",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },

  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  cardSub: {
    color: "#CBD5E1",
    marginTop: 8,
    lineHeight: 22,
  },

  resetButton: {
    backgroundColor: "#EF4444",
    padding: 18,
    borderRadius: 18,
    marginTop: 20,
  },

  resetText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  bottomNav: {
    position: "absolute",
    bottom: 18,
    left: 8,
    right: 8,
    height: 72,
    backgroundColor: "#10203F",
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  navItem: {
    fontSize: 24,
    textAlign: "center",
  },
  logoutButton: {
  backgroundColor: "#334155",
  padding: 18,
  borderRadius: 18,
  marginTop: 10,
},

logoutText: {
  color: "white",
  textAlign: "center",
  fontWeight: "bold",
},
});