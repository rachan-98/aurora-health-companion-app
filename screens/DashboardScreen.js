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

function HealthCard({ title, value, subtitle, percent }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardSub}>{subtitle}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

export default function DashboardScreen({
  setScreen,
  profile,
  water,
  waterGoal,
  sleep,
  habits,
  mood,
  setMood,
  streak,
}) {

const waterPercent = Math.min(
  Math.round((water / waterGoal) * 100),
  100
);

const completedHabits = habits.filter((h) => h.done).length;

const habitPercent = Math.round(
  (completedHabits / habits.length) * 100
);

const sleepPercent = Math.min(
  Math.round((7.33 / 8) * 100),
  100
);

const nutritionPercent = 55;

const healthScore = Math.round(
  waterPercent * 0.3 +
  sleepPercent * 0.2 +
  habitPercent * 0.3 +
  nutritionPercent * 0.2
);

const achievements = [];

if (water >= 3000) {
  achievements.push("💧 Water Master");
}

if (sleepPercent >= 90) {
  achievements.push("😴 Sleep Champion");
}

if (completedHabits === habits.length) {
  achievements.push("✅ Habit Hero");
}

if (streak >= 5) {
  achievements.push("🔥 5 Day Streak");
}

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 120,
  }}
>
        <Text style={styles.heading}>
          Good Morning, {profile.name || "Rachan"} 👋
        </Text>
        <Text style={styles.subHeading}>Here is your health summary today</Text>

 <View style={styles.scoreCard}>
  <View>
    <Text style={styles.scoreNumber}>{healthScore}</Text>
    <Text style={styles.scoreLabel}>Health Score</Text>
  </View>

  <Text style={styles.scoreText}>
    Hydration: {waterPercent}%{"\n"}
    Sleep: {sleepPercent}%{"\n"}
    Habits: {habitPercent}%{"\n\n"}
    Overall wellness score based on today's activity.
  </Text>
</View>

        <HealthCard
          title="💧 Hydration"
          value={`${water / 1000} / 3 Litres`}
          subtitle={`${waterPercent}% completed today`}
          percent={waterPercent}
        />

        <HealthCard
          title="😴 Sleep"
          value={sleep}
          subtitle="Your sleep consistency looks good this week."
          percent={78}
        />

        <HealthCard
          title="✅ Habits"
          value={`${completedHabits} / ${habits.length} Completed`}
          subtitle="Complete one more habit to improve your score."
          percent={habitPercent}
        />

        <TouchableOpacity
  style={styles.card}
  onPress={() => setScreen("nutrition")}
>
  <Text style={styles.cardTitle}>🍎 Nutrition</Text>

  <Text style={styles.cardValue}>1200 kcal</Text>

  <Text style={styles.cardSub}>
    Tap to track meals and calories.
  </Text>

  <View style={styles.progressBar}>
    <View
      style={[
        styles.progressFill,
        { width: "55%" },
      ]}
    />
  </View>
</TouchableOpacity>

<TouchableOpacity
style={styles.card}
onPress={() => setScreen("mood")}
>
<Text style={styles.cardTitle}>
😊 Mood
</Text>

<Text style={styles.cardValue}>
{mood || "Not Logged"}
</Text>

<Text style={styles.cardSub}>
Track how you feel today.
</Text>
</TouchableOpacity>

<View style={styles.card}>
  <Text style={styles.cardTitle}>🔥 Current Streak</Text>
  

  <Text style={styles.cardValue}>
    {streak} Days
  </Text>
  

  <Text style={styles.cardSub}>
    Keep logging your health data daily
    to maintain your streak.
  </Text>

  <View style={styles.progressBar}>
    <View
      style={[
        styles.progressFill,
        {
          width: `${Math.min(streak * 10, 100)}%`,
        },
      ]}
    />
  </View>
</View>

<View style={styles.card}>
  <Text style={styles.cardTitle}>🏆 Achievements</Text>

  {achievements.length === 0 ? (
    <Text style={styles.cardSub}>
      Complete activities to unlock achievements.
    </Text>
  ) : (
    achievements.map((item, index) => (
      <Text key={index} style={styles.cardSub}>
        {item}
      </Text>
    ))
  )}
</View>

<TouchableOpacity
  style={styles.card}
  onPress={() => setScreen("charts")}
>
  <Text style={styles.cardTitle}>
    📈 Health Analytics
  </Text>

  <Text style={styles.cardSub}>
    View water, sleep and mood trends.
  </Text>

  <Text
    style={{
      color: "#4ADE80",
      marginTop: 10,
      fontWeight: "bold",
    }}
  >
    Open Analytics →
  </Text>
</TouchableOpacity>

        <View style={styles.card}>
  <Text style={styles.cardTitle}>
    😊 Daily Mood Check-In
  </Text>

  <Text style={styles.cardSub}>
    How are you feeling today?
  </Text>

  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 15,
    }}
  >
    <TouchableOpacity onPress={() => setMood("Great")}>
      <Text style={{ fontSize: 35 }}>😊</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setMood("Okay")}>
      <Text style={{ fontSize: 35 }}>😐</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => setMood("Low")}>
      <Text style={{ fontSize: 35 }}>😔</Text>
    </TouchableOpacity>
  </View>

  {mood !== "" && (
    <Text
      style={{
        color: "#4ADE80",
        marginTop: 15,
        fontWeight: "bold",
      }}
    >
      Today's Mood: {mood}
    </Text>
  )}
</View>

        <TouchableOpacity
  style={styles.card}
  onPress={() => setScreen("settings")}
>
  <Text style={styles.cardTitle}>
    ⚙️ Settings
  </Text>

  <Text style={styles.cardSub}>
    Manage profile, preferences and data.
  </Text>
</TouchableOpacity>

<TouchableOpacity style={styles.aiCard} onPress={() => setScreen("ai")}>
          <Text style={styles.cardTitle}>🤖 Aurora AI Coach</Text>
         <Text style={styles.cardSub}>
  {mood === "Great"
    ? "You're feeling great today. Keep your momentum going."
    : mood === "Okay"
    ? "A short walk and hydration could improve your energy."
    : mood === "Low"
    ? "Take it easy today. Focus on hydration, rest and one small win."
    : "Tell Aurora how you're feeling for personalized advice."}
</Text>
          <Text style={styles.aiCardButton}>Talk to Aurora →</Text>
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
  scoreCard: {
    backgroundColor: "#12325F",
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    flexDirection: "row",
    gap: 18,
    alignItems: "center",
  },
  scoreNumber: {
    color: "#4ADE80",
    fontSize: 48,
    fontWeight: "bold",
  },
  scoreLabel: {
    color: "#CBD5E1",
    fontSize: 13,
  },
 scoreText: {
  color: "#E2E8F0",
  marginTop: 10,
  lineHeight: 24,
},
  card: {
    backgroundColor: "#10203F",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
  },
  aiCard: {
    backgroundColor: "#14325F",
    borderRadius: 22,
    padding: 20,
    marginBottom: 100,
  },
  cardTitle: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
  cardValue: {
    color: "#4ADE80",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 8,
  },
  cardSub: {
    color: "#CBD5E1",
    marginTop: 8,
    lineHeight: 22,
    fontSize: 15,
  },
  aiCardButton: {
    color: "#4ADE80",
    marginTop: 12,
    fontWeight: "bold",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#1E3A5F",
    borderRadius: 20,
    marginTop: 15,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ADE80",
    borderRadius: 20,
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