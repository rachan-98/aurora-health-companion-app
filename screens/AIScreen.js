import React, { useState } from "react";
import * as Speech from "expo-speech";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
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

export default function AIScreen({
  setScreen,
  addWater,
  setSleep,
  addHabit,
  profile,
  water,
  waterGoal,
  mood,
  habits,
})  {
const [message, setMessage] = useState("");

const [messages, setMessages] = useState([
  {
    sender: "ai",
    text: `Hello ${profile.name || "there"} 👋

I'm Aurora.

I can help with hydration, sleep, habits and daily wellness advice.`,
  },
]);

const askAurora = () => {
  if (!message.trim()) return;

  let response = "";

  const text = message.toLowerCase();

  if (text.includes("water")) {
    addWater(500);

    response = `Based on your profile, staying near 3 litres daily is ideal.

I've also added 500ml to today's hydration progress. 💧`;
  } else if (text.includes("sleep")) {
    setSleep("8h");

    response = `Sleep is one of the strongest predictors of recovery.

I've updated today's sleep log to 8 hours. 😴`;
  } else if (
    text.includes("habit") ||
    text.includes("meditation")
  ) {
    addHabit("Meditation");

    response = `Great choice.

Meditation habit has been added to your routine. ✅`;
  } else if (
    text.includes("weight") ||
    text.includes("bmi")
  ) {
    response = `Your current profile suggests focusing on consistent hydration, sleep and movement.

Small daily improvements create long-term health gains.`;
  } else {

const completedHabits =
habits.filter((h) => h.done).length;

const hydrationPercent =
Math.round((water / waterGoal) * 100);

response =
`${profile.name || "Friend"}, here's today's health summary:

💧 Hydration: ${hydrationPercent}%

✅ Habits: ${completedHabits}/${habits.length}

😊 Mood: ${mood || "Not Logged"}

Aurora Recommendation:

${
hydrationPercent < 70
? "Drink more water today."
: "Hydration is looking great."
}

${
mood === "Low"
? "Take some time to rest and recharge."
: mood === "Great"
? "Keep using your positive energy."
: "Focus on consistency."
}`;
}

setMessages((prev) => [
  ...prev,
  {
    sender: "user",
    text: message,
  },
  {
    sender: "ai",
    text: response,
  },
]);

Speech.speak(response, {
  language: "en-US",
  rate: 0.9,
  pitch: 1.0,
});

setMessage("");
};

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 120,
  }}
>
        <Text style={styles.heading}>Aurora AI 🤖</Text>
        <Text style={styles.subHeading}>Your personal health companion</Text>

        {messages.map((msg, index) => (
  <View
    key={index}
    style={
      msg.sender === "user"
        ? styles.userBubble
        : styles.chatBubbleAI
    }
  >
    <Text style={styles.chatText}>{msg.text}</Text>

{msg.sender === "ai" && (
  <TouchableOpacity
    onPress={() =>
      Speech.speak(msg.text, {
        language: "en-US",
        rate: 0.9,
        pitch: 1.0,
      })
    }
  >
    <Text style={styles.listenButton}>
      🔊 Listen
    </Text>
  </TouchableOpacity>
)}
  </View>
))}
        <View
style={{
flexDirection: "row",
flexWrap: "wrap",
marginBottom: 15,
}}
>

<TouchableOpacity
style={styles.quickButton}
onPress={() =>
setMessage("How am I doing today?")
}
>
<Text style={styles.quickButtonText}>
📊 Today
</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.quickButton}
onPress={() =>
setMessage("Give hydration advice")
}
>
<Text style={styles.quickButtonText}>
💧 Water
</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.quickButton}
onPress={() =>
setMessage("Improve my sleep")
}
>
<Text style={styles.quickButtonText}>
😴 Sleep
</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.quickButton}
onPress={() =>
setMessage("Motivate me")
}
>
<Text style={styles.quickButtonText}>
🔥 Motivate
</Text>
</TouchableOpacity>

</View>
        <TextInput
          placeholder='Try: "I drank 500ml water"'
          placeholderTextColor="#94A3B8"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={askAurora}>
          <Text style={styles.primaryButtonText}>Ask Aurora</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Try these commands</Text>
          <Text style={styles.cardSub}>• I drank 500ml water</Text>
          <Text style={styles.cardSub}>• I slept 7 hours</Text>
          <Text style={styles.cardSub}>• Create a habit to meditate</Text>
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
userBubble: {
  backgroundColor: "#4ADE80",
  borderRadius: 22,
  padding: 18,
  marginBottom: 12,
  alignSelf: "flex-end",
  maxWidth: "85%",
},

chatBubbleAI: {
  backgroundColor: "#12325F",
  borderRadius: 22,
  padding: 20,
  marginBottom: 12,
  maxWidth: "90%",
},
  chatText: {
    color: "white",
    lineHeight: 24,
    fontSize: 16,
  },
  listenButton: {
  color: "#4ADE80",
  marginTop: 10,
  fontWeight: "bold",
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
  card: {
    backgroundColor: "#10203F",
    borderRadius: 22,
    padding: 20,
    marginTop: 18,
    marginBottom: 100,
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
  quickButton: {
  backgroundColor: "#12325F",
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 20,
  marginRight: 10,
  marginBottom: 10,
},

quickButtonText: {
  color: "#4ADE80",
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