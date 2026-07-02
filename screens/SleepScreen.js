import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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

export default function SleepScreen({
  setScreen,
  sleep,
  setSleep,
}) {
  const sleepPercent = sleep === "8h" ? 100 : 92;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <Text style={styles.heading}>
          Sleep 😴
        </Text>

        <Text style={styles.subHeading}>
          Better sleep, better recovery
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Last Night
          </Text>

          <Text style={styles.cardValue}>
            {sleep}
          </Text>

          <Text style={styles.cardSub}>
            Target: 8 hours
          </Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${sleepPercent}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📊 Sleep Analytics
          </Text>

          <Text style={styles.cardSub}>
            Weekly Average: 7h 15m
          </Text>

          <Text style={styles.cardSub}>
            Best Day: Saturday
          </Text>

          <Text style={styles.cardSub}>
            Consistency Score: 88%
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            🤖 Aurora Sleep Insight
          </Text>

          <Text style={styles.cardSub}>
            {sleep === "8h"
              ? "Excellent sleep duration. Recovery and energy levels should improve."
              : "You are slightly below the recommended sleep target. Try sleeping 30 minutes earlier tonight."}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setSleep("8h")}
        >
          <Text style={styles.buttonText}>
            Log 8 Hours Sleep
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => setSleep("7h")}
        >
          <Text style={styles.buttonText}>
            Log 7 Hours Sleep
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
  },

  subHeading: {
    color: "#94A3B8",
    marginTop: 8,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#10203F",
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
  },

  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  cardValue: {
    color: "#4ADE80",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: 12,
  },

  cardSub: {
    color: "#CBD5E1",
    marginTop: 10,
    lineHeight: 22,
  },

  progressBar: {
    height: 10,
    backgroundColor: "#1E3A5F",
    borderRadius: 20,
    marginTop: 18,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#4ADE80",
  },

  button: {
    backgroundColor: "#4ADE80",
    padding: 16,
    borderRadius: 18,
    marginTop: 10,
  },

  buttonSecondary: {
    backgroundColor: "#12325F",
    padding: 16,
    borderRadius: 18,
    marginTop: 10,
  },

  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
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