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

export default function HabitsScreen({
  setScreen,
  habits,
  toggleHabit,
}) {

  const completedHabits =
    habits.filter((h) => h.done).length;

  const habitPercent =
    habits.length > 0
      ? Math.round(
          (completedHabits / habits.length) * 100
        )
      : 0;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <Text style={styles.heading}>
          Habits ✅
        </Text>

        <Text style={styles.subHeading}>
          Small actions, daily consistency
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {habitPercent}%
          </Text>

          <Text style={styles.summaryText}>
            Completion Rate
          </Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${habitPercent}%`,
                },
              ]}
            />
          </View>
        </View>

        {habits.map((habit, index) => (
          <TouchableOpacity
            key={`${habit.name}-${index}`}
            style={styles.habitRow}
            onPress={() => toggleHabit(index)}
          >
            <Text style={styles.habitText}>
              {habit.name}
            </Text>

            <Text
              style={
                habit.done
                  ? styles.doneText
                  : styles.pendingText
              }
            >
              {habit.done
                ? "✅ Done"
                : "⏳ Pending"}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            🤖 Aurora Habit Insight
          </Text>

          <Text style={styles.cardSub}>
            {habitPercent >= 80
              ? "Excellent consistency. Keep building your routine."
              : habitPercent >= 50
              ? "You're making progress. Complete a few more habits today."
              : "Focus on one habit at a time and build momentum."}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📈 Habit Analytics
          </Text>

          <Text style={styles.cardSub}>
            Completed Today: {completedHabits}
          </Text>

          <Text style={styles.cardSub}>
            Remaining: {habits.length - completedHabits}
          </Text>

          <Text style={styles.cardSub}>
            Success Rate: {habitPercent}%
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

  summaryCard: {
    backgroundColor: "#12325F",
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    alignItems: "center",
  },

  summaryNumber: {
    color: "#4ADE80",
    fontSize: 50,
    fontWeight: "bold",
  },

  summaryText: {
    color: "#CBD5E1",
    marginTop: 5,
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
  },

  habitRow: {
    backgroundColor: "#10203F",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  habitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  doneText: {
    color: "#4ADE80",
    fontWeight: "bold",
  },

  pendingText: {
    color: "#FBBF24",
    fontWeight: "bold",
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