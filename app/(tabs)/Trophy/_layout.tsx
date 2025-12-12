import { Stack } from "expo-router";

export default function LayoutTrophy() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Confronto" />
      <Stack.Screen name="HallOfFame" />
      <Stack.Screen name="Casas" />
      <Stack.Screen name="Modalidades" />
    </Stack>
  );
}
