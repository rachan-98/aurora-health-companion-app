import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HydrationScreen from "./screens/HydrationScreen";
import SleepScreen from "./screens/SleepScreen";
import HabitsScreen from "./screens/HabitsScreen";
import AIScreen from "./screens/AIScreen";
import NutritionScreen from "./screens/NutritionScreen";
import MoodScreen from "./screens/MoodScreen";
import SplashScreen from "./screens/SplashScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ChartsScreen from "./screens/ChartsScreen";

import API from "./services/api";

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [profile, setProfile] = useState({
    name: "Rachan",
    age: "",
    weight: "",
    height: "",
    gender: "",
    goal: "",
  });

  const [water, setWater] = useState(1500);
  const waterGoal = 3000;

  const [streak, setStreak] = useState(5);
  const [sleep, setSleep] = useState("7h 20m");
  const [mood, setMood] = useState("");

  const [habits, setHabits] = useState([
    { name: "Morning Walk", done: true },
    { name: "Drink Water", done: true },
    { name: "Meditation", done: false },
    { name: "Stretching", done: true },
  ]);

  const [nutrition, setNutrition] = useState({
  calories: 1200,
  protein: 82,
  carbs: 180,
  fats: 52,
});

  useEffect(() => {
    const setupNotifications = async () => {
      await Notifications.requestPermissionsAsync();

      await Notifications.cancelAllScheduledNotificationsAsync();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "💧 Water Reminder",
          body: "Time to drink some water!",
        },
        trigger: {
          seconds: 7200,
          repeats: true,
        },
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "😴 Sleep Reminder",
          body: "Try preparing for sleep soon.",
        },
        trigger: {
          seconds: 43200,
          repeats: true,
        },
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "✅ Habit Reminder",
          body: "Complete your habits today.",
        },
        trigger: {
          seconds: 21600,
          repeats: true,
        },
      });
    };

    setupNotifications();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("auroraData");

        const savedLogin = await AsyncStorage.getItem("isLoggedIn");

if (savedLogin === "true") {
  setIsLoggedIn(true);
}
        

        if (savedData) {
          const parsed = JSON.parse(savedData);

          if (parsed.profile) setProfile(parsed.profile);
          if (parsed.water !== undefined) setWater(parsed.water);
          if (parsed.sleep) setSleep(parsed.sleep);
          if (parsed.mood !== undefined) setMood(parsed.mood);
          if (parsed.habits) setHabits(parsed.habits);
          if (parsed.nutrition) setNutrition(parsed.nutrition);
        }
      } catch (error) {
        console.log("Load error:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);
  
  useEffect(() => {
    if (!isLoaded) return;

    const saveData = async () => {
      try {
        const auroraData = {
          profile,
          water,
          sleep,
          mood,
          habits,
          nutrition,
        };

        await AsyncStorage.setItem(
          "auroraData",
          JSON.stringify(auroraData)
        );

        if (profile.name && profile.name.trim() !== "") {
          await API.post("/user/save", {
            ...profile,
            water,
            sleep,
            mood,
            habits,
            nutrition,
          });

          console.log("MongoDB auto-save success");
        }
      } catch (error) {
        console.log("Save error:", error.message);
      }
    };

    saveData();
  }, [profile, water, sleep, mood, habits, nutrition, isLoaded]);

  const addWater = (amount) => {
    setWater((prev) => Math.min(prev + amount, waterGoal));
  };

  const toggleHabit = (index) => {
    setHabits((prev) =>
      prev.map((habit, i) =>
        i === index
          ? { ...habit, done: !habit.done }
          : habit
      )
    );
  };

  const addHabit = (habitName) => {
    setHabits((prev) => [
      ...prev,
      { name: habitName, done: false },
    ]);
  };

  const sharedProps = {
    setScreen,
    profile,
    setProfile,
    water,
    waterGoal,
    addWater,
    setWater,
    streak,
    setStreak,
    sleep,
    setSleep,
    habits,
    setHabits,
    toggleHabit,
    addHabit,
    mood,
    setMood,
    nutrition,
    setNutrition,
    isLoggedIn,
    setIsLoggedIn,
  };

  if (!isLoaded) return null;

  if (screen === "splash") {
  return (
    <SplashScreen
      setScreen={() => {
        if (isLoggedIn) {
          setScreen("dashboard");
        } else {
          setScreen("login");
        }
      }}
    />
  );
}

  if (screen === "login")
    return <LoginScreen {...sharedProps} />;

  if (screen === "profile")
    return <ProfileScreen {...sharedProps} />;

  if (screen === "hydration")
    return <HydrationScreen {...sharedProps} />;

  if (screen === "sleep")
    return <SleepScreen {...sharedProps} />;

  if (screen === "habits")
    return <HabitsScreen {...sharedProps} />;

  if (screen === "ai")
    return <AIScreen {...sharedProps} />;

  if (screen === "nutrition")
    return <NutritionScreen {...sharedProps} />;

  if (screen === "mood")
    return <MoodScreen {...sharedProps} />;

  if (screen === "settings")
    return <SettingsScreen {...sharedProps} />;

  if (screen === "charts")
    return <ChartsScreen {...sharedProps} />;

  return <DashboardScreen {...sharedProps} />;
}
