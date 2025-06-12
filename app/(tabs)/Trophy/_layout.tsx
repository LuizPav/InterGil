import { Stack } from "expo-router";

export default function LayoutTrophy() {
  return (
    <Stack screenOptions={{ }}>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="Confronto" options={{ headerShown: false}}/>
      <Stack.Screen name="Placar" />
      <Stack.Screen name="Casas" />
      <Stack.Screen name="Modalidades" />
    </Stack>
  );
}