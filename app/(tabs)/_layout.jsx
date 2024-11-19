/** @format */

import { SplashScreen, Tabs } from "expo-router";
import React, { useEffect } from "react";

import {
  TabBarIcon,
  TabBarIconFontAwesome,
} from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Oswald-Regular": require("../../assets/fonts/Oswald-Regular.ttf"),
    "Oswald-Bold": require("../../assets/fonts/Oswald-Bold.ttf"),
    "Oswald-SemiBold": require("../../assets/fonts/Oswald-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
        },
        tabBarLabelStyle: {
          fontFamily: "Oswald-Regular",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Characters",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="planet"
        options={{
          title: "Planets",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "planet" : "planet-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="starship"
        options={{
          title: "Starships",
          tabBarIcon: ({ color }) => (
            <TabBarIconFontAwesome name={"jet-fighter"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="film"
        options={{
          title: "Films",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconFontAwesome
              name={focused ? "film" : "film"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-circle-sharp" : "person-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
