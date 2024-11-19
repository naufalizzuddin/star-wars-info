/** @format */

import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { tint } from "../constants/Colors";
import { UserContext } from "../context/UserContext";

const Onboarding = () => {
  const [nama, setNama] = useState(null);
  const { setUser } = useContext(UserContext);

  const handleUserName = (data) => {
    setNama(data);
    setUser(data);
  };

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
          <TextInput
            style={styles.input}
            onChangeText={handleUserName}
            value={nama}
            placeholder="Enter your name"
            placeholderTextColor={tint}
          ></TextInput>
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
  input: {
    height: 50,
    borderColor: tint,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    width: 250,
    textAlign: "center",
    color: tint,
    fontFamily: "Oswald-Regular",
    fontSize: 20,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 27,
    fontFamily: "Oswald-Bold",
  },
  continue: {
    borderColor: tint,
    borderWidth: 1,
    borderRadius: 25,
    textAlign: "center",
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    color: tint,
    fontSize: 20,
    fontFamily: "Oswald-Bold",
  },
});
