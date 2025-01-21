import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import "../global.css";
import { useFonts } from "expo-font";
import { GlobalProvider } from "@/lib/global-provider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Rubik: require("../assets/fonts/Rubik-Regular.ttf"),
    RubikBold: require("../assets/fonts/Rubik-Bold.ttf"),
    RubikExtraBold: require("../assets/fonts/Rubik-ExtraBold.ttf"),
    RubikLight: require("../assets/fonts/Rubik-Light.ttf"),
    RubikMedium: require("../assets/fonts/Rubik-Medium.ttf"),
    RubikSemiBold: require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide splash screen after resources are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Show white status bar during loading
  if (!fontsLoaded) {
    return (
      <>
        <StatusBar 
          backgroundColor="#ffffff" 
          style="dark"
          translucent={false}
        />
      </>
    );
  }

  return (
    <GlobalProvider>
      <StatusBar 
        backgroundColor="#ffffff" 
        style="dark"
        translucent={false}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
