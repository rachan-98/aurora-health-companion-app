import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function SplashScreen({
  setScreen,
}) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen("login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.logo}>
          🌿
        </Text>

        <Text style={styles.title}>
          Aurora
        </Text>

        <Text style={styles.tagline}>
          AI Powered Health Companion
        </Text>

        <ActivityIndicator
          size="large"
          color="#4ADE80"
          style={{
            marginTop: 30,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#07152F",
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },

  logo:{
    fontSize:80,
  },

  title:{
    color:"white",
    fontSize:42,
    fontWeight:"bold",
    marginTop:10,
  },

  tagline:{
    color:"#94A3B8",
    marginTop:10,
    fontSize:16,
  },
});