import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

export default function Layout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="trophy" />
      <Tabs.Screen name="notes" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
