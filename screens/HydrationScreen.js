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

export default function HydrationScreen({
  setScreen,
  water,
  waterGoal,
  addWater,
  streak,
}) {
  const waterPercent = Math.min(
    Math.round((water / waterGoal) * 100),
    100
  );

  const logWater = (amount) => {
    addWater(amount);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 120,
  }}
>
        <Text style={styles.heading}>Hydration 💧</Text>

        <Text style={styles.subHeading}>
          Build your water routine today
        </Text>

        <View style={styles.bigProgressCard}>

<Text style={styles.cardTitle}>
💧 Virtual Water Bottle
</Text>

<View style={styles.bottleContainer}>
  <View
    style={[
      styles.waterFill,
      {
        height: `${waterPercent}%`,
      },
    ]}
  />
</View>

<Text style={styles.bigPercent}>
  {waterPercent}%
</Text>

<Text style={styles.cardSub}>
  {water}ml of {waterGoal}ml completed
</Text>

<View style={styles.progressBar}>
  <View
    style={[
      styles.progressFill,
      { width: `${waterPercent}%` },
    ]}
  />
</View>

</View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔥 Current Streak</Text>

          <Text style={styles.bigStreak}>{streak} Days</Text>

          <Text style={styles.cardSub}>
            Stay consistent to maintain your streak.
          </Text>
        </View>

        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => logWater(250)}
          >
            <Text style={styles.smallButtonText}>+250ml</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => logWater(500)}
          >
            <Text style={styles.smallButtonText}>+500ml</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => logWater(750)}
          >
            <Text style={styles.smallButtonText}>+750ml</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Aurora Insight</Text>

          <Text style={styles.cardSub}>
  {waterPercent >= 90
    ? "Excellent hydration today. Keep maintaining your routine."
    : waterPercent >= 70
    ? "You're doing well. One more bottle and you'll reach your goal."
    : waterPercent >= 50
    ? "You're halfway there. Try drinking another glass now."
    : "Hydration is low today. Focus on drinking more water throughout the day."}
</Text>
        </View>
      </ScrollView>

      <BottomNav setScreen={setScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#07152F",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 12,
  },
  subHeading: {
    color: "#94A3B8",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 22,
  },
  bottleContainer: {
  width: 100,
  height: 180,
  borderWidth: 4,
  borderColor: "#4ADE80",
  borderRadius: 30,
  overflow: "hidden",
  marginTop: 20,
  marginBottom: 20,
  justifyContent: "flex-end",
  backgroundColor: "#0F2347",
},

waterFill: {
  width: "100%",
  backgroundColor: "#4ADE80",
},

  bigPercent: {
    backgroundColor: "#10203F",
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
    marginBottom: 22,
  },
  bigPercent: {
    color: "#4ADE80",
    fontSize: 64,
    fontWeight: "bold",
  },
  bigStreak: {
    color: "#4ADE80",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#10203F",
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
  },
  cardTitle: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
  cardSub: {
    color: "#CBD5E1",
    marginTop: 8,
    lineHeight: 22,
    fontSize: 15,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#1E3A5F",
    borderRadius: 20,
    marginTop: 15,
    overflow: "hidden",
    width: "100%",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ADE80",
    borderRadius: 20,
  },
  quickRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 18,
  },
  smallButton: {
    backgroundColor: "#4ADE80",
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  smallButtonText: {
    color: "#07152F",
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
});