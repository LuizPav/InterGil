import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/src/firebaseConnection';
import { useRouter } from 'expo-router';

import '../global.css'

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type AuthUser = {
  email: string | null;
  uid: string;
}

export default function RootLayout() {
  
  const router = useRouter();

   const [authUser, setAuthUser] = useState<AuthUser | null>(null);
   const [checkingAuth, setCheckingAuth] = useState(true);
    
   const colorScheme = useColorScheme();
   const [loaded] = useFonts({
     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
     'Horizon-regular': require('@/assets/fonts/horizon.otf'),
     'HankenGrotesck-Medium': require('@/assets/fonts/HankenGrotesk-Medium.ttf'),
     'clear-sans': require('@/assets/fonts/clear-sans.bold.ttf'),
    });
    
    useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if(user) {
        setAuthUser({
          email: user.email,
          uid: user.uid,
        });
        router.replace('/Home');
        return;
      } else {
        setAuthUser(null);
      }
    })
    setCheckingAuth(false);
  }, [])
  
  if(!checkingAuth) {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
    
  }
  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="Register" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
