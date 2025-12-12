import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";

import {
  AuthUserContextProvider,
  useAuthUser,
} from "@/src/contexts/AuthUserContext";

import "../global.css";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { user, isLoading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace("/(tabs)/Home");
      } else {
        router.replace("/");
      }
      SplashScreen.hideAsync();
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <ActivityIndicator color={"#FFF"} size={"large"} />
        <Text className="text-center text-lg text-white font-clearSans mt-4">
          Carregando usuário
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="Register" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Horizon-regular": require("@/assets/fonts/horizon.otf"),
    "HankenGrotesck-Medium": require("@/assets/fonts/HankenGrotesk-Medium.ttf"),
    "clear-sans": require("@/assets/fonts/clear-sans.bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthUserContextProvider>
          <InitialLayout />
          <StatusBar style="auto" />
        </AuthUserContextProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
