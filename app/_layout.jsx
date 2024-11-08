/** @format */

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";
import { UserContext } from "../context/UserContext";

import Header from "../components/header/Header";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [user, setUser] = useState("Naufal");

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="index"
            user={user}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: true,
              headerLeft: () => <Header />,
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: "#000",
              },
            }}
          />
        </Stack>
        <StatusBar style="light" backgroundColor="#000" />
      </ThemeProvider>
    </UserContext.Provider>
  );
}
