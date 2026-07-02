import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  LineChart,
  BarChart,
} from "react-native-chart-kit";

const chartConfig = {
  backgroundGradientFrom: "#10203F",
  backgroundGradientTo: "#10203F",
  decimalPlaces: 0,
  color: (opacity = 1) =>
    `rgba(74, 222, 128, ${opacity})`,
  labelColor: () => "#CBD5E1",
};

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

export default function ChartsScreen({
  setScreen,
}) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          📈 Health Analytics
        </Text>
        <TouchableOpacity
  onPress={() => setScreen("dashboard")}
  style={styles.backButton}
>
  <Text style={styles.backText}>
    ← Back to Dashboard
  </Text>
</TouchableOpacity>

        <Text style={styles.subHeading}>
          Weekly Performance Overview
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            💧 Water Intake
          </Text>

          <LineChart
            data={{
              labels: [
                "M",
                "T",
                "W",
                "T",
                "F",
                "S",
                "S",
              ],
              datasets: [
                {
                  data: [
                    2200,
                    2600,
                    2400,
                    3000,
                    2800,
                    3100,
                    2700,
                  ],
                },
              ],
            }}
            width={320}
            height={220}
            chartConfig={chartConfig}
            bezier
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            😴 Sleep Hours
          </Text>

          <BarChart
            data={{
              labels: [
                "M",
                "T",
                "W",
                "T",
                "F",
                "S",
                "S",
              ],
              datasets: [
                {
                  data: [
                    7,
                    8,
                    6,
                    8,
                    7,
                    8,
                    7,
                  ],
                },
              ],
            }}
            width={320}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            😊 Mood Trend
          </Text>

          <LineChart
            data={{
              labels: [
                "M",
                "T",
                "W",
                "T",
                "F",
                "S",
                "S",
              ],
              datasets: [
                {
                  data: [
                    4,
                    5,
                    3,
                    4,
                    5,
                    4,
                    5,
                  ],
                },
              ],
            }}
            width={320}
            height={220}
            chartConfig={chartConfig}
          />
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
    padding: 15,
    marginBottom: 20,
  },

  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  backButton: {
  marginTop: 10,
  marginBottom: 15,
},

backText: {
  color: "#4ADE80",
  fontSize: 16,
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