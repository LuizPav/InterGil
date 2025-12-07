import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
import {
  AuthUserContextProvider,
  useAuthUser,
} from "@/src/contexts/authUserContext";

import "../global.css";

import { useEffect } from "react";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const { user, isLoading } = useAuthUser();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Horizon-regular": require("@/assets/fonts/horizon.otf"),
    "HankenGrotesck-Medium": require("@/assets/fonts/HankenGrotesk-Medium.ttf"),
    "clear-sans": require("@/assets/fonts/clear-sans.bold.ttf"),
  });

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/(tabs)/Home");
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoading, user, router]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <GestureHandlerRootView>
        <AuthUserContextProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="Login" options={{ headerShown: false }} />
            <Stack.Screen name="Register" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </AuthUserContextProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
