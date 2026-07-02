import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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

export default function MoodScreen({
  mood,
  setMood,
  setScreen,
}) {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>
        Mood Tracker 😊
      </Text>

      <Text style={styles.subHeading}>
        How are you feeling today?
      </Text>

      <TouchableOpacity
        style={[
          styles.card,
          mood === "Great" && styles.selected,
        ]}
        onPress={() => {
  console.log("Mood changed to Great");
  setMood("Great");
}}
      >
        <Text style={styles.emoji}>😊</Text>
        <Text style={styles.cardText}>
          Great
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          mood === "Okay" && styles.selected,
        ]}
        onPress={() => {
  console.log("Mood changed to Okay");
  setMood("Okay");
}}
      >
        <Text style={styles.emoji}>😐</Text>
        <Text style={styles.cardText}>
          Okay
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          mood === "Low" && styles.selected,
        ]}
        onPress={() => {
  console.log("Mood changed to Low");
  setMood("Low");
}}
      >
        <Text style={styles.emoji}>😔</Text>
        <Text style={styles.cardText}>
          Low
        </Text>
      </TouchableOpacity>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Today's Mood
        </Text>

        <Text style={styles.summaryValue}>
          {mood || "Not Selected"}
        </Text>
      </View>

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
  },

  subHeading: {
    color: "#94A3B8",
    marginTop: 8,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#10203F",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
  },

  selected: {
    borderWidth: 2,
    borderColor: "#4ADE80",
  },

  emoji: {
    fontSize: 45,
  },

  cardText: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },

  summaryCard: {
    backgroundColor: "#12325F",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },

  summaryTitle: {
    color: "#CBD5E1",
  },

  summaryValue: {
    color: "#4ADE80",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
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
});