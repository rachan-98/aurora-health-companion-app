import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
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

export default function NutritionScreen({
  setScreen,
  nutrition,
  setNutrition,
}) {

  const addBreakfast = () => {
    setNutrition((prev) => ({
      ...prev,
      calories: prev.calories + 300,
      protein: prev.protein + 12,
      carbs: prev.carbs + 40,
      fats: prev.fats + 8,
    }));
  };

  const addLunch = () => {
    setNutrition((prev) => ({
      ...prev,
      calories: prev.calories + 500,
      protein: prev.protein + 20,
      carbs: prev.carbs + 60,
      fats: prev.fats + 15,
    }));
  };

  const addDinner = () => {
    setNutrition((prev) => ({
      ...prev,
      calories: prev.calories + 450,
      protein: prev.protein + 18,
      carbs: prev.carbs + 50,
      fats: prev.fats + 12,
    }));
  };

  const caloriePercent = Math.min(
    (nutrition.calories / 2200) * 100,
    100
  );

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>
          Nutrition 🍎
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Today's Calories
          </Text>

          <Text style={styles.bigText}>
            {nutrition.calories} kcal
          </Text>

          <Text style={styles.cardSub}>
            Recommended: 2200 kcal
          </Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${caloriePercent}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            🥩 Macronutrients
          </Text>

          <Text style={styles.cardSub}>
            Protein: {nutrition.protein}g / 120g
          </Text>

          <Text style={styles.cardSub}>
            Carbs: {nutrition.carbs}g / 250g
          </Text>

          <Text style={styles.cardSub}>
            Fats: {nutrition.fats}g / 70g
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={addBreakfast}
        >
          <Text style={styles.buttonText}>
            🍳 Add Breakfast (+300 kcal)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={addLunch}
        >
          <Text style={styles.buttonText}>
            🍛 Add Lunch (+500 kcal)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={addDinner}
        >
          <Text style={styles.buttonText}>
            🍽 Add Dinner (+450 kcal)
          </Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            🤖 Aurora Recommendation
          </Text>

          <Text style={styles.cardSub}>
            {nutrition.protein < 120
              ? "Your protein intake is below target. Consider eggs, paneer, chicken, fish, tofu, or dal."
              : "Great job! Your protein intake is looking strong today."}
          </Text>
        </View>

        <View style={{ height: 120 }} />
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
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#10203F",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  cardTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  cardSub: {
    color: "#CBD5E1",
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
  },

  bigText: {
    color: "#4ADE80",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: 15,
  },

  button: {
    backgroundColor: "#4ADE80",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
  },

  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#07152F",
    fontSize: 16,
  },

  progressBar: {
    height: 12,
    backgroundColor: "#1E3A5F",
    borderRadius: 20,
    marginTop: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#4ADE80",
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