/** @format */

import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Image } from "react-native";

const Onboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/onboarding/spacebackground.png")}
        resizeMode="stretch"
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <Text style={styles.text}>Discover</Text>
          <Image
            source={require("../assets/onboarding/starwars-logo.png")}
            style={{ width: "100%", height: "20%", resizeMode: "contain" }}
          />
          <Link href={"/(tabs)"} style={styles.continue}>
            Explore
          </Link>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 27,
  },
  textTitle: {
    color: "#eb7734",
    textAlign: "center",
    fontSize: 35,
  },
  continue: {
    borderColor: "#eb7734",
    borderWidth: 1,
    borderRadius: 25,
    textAlign: "center",
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    color: "#eb7734",
    fontSize: 20,
  },
});
