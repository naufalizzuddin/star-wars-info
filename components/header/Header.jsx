/** @format */

import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/onboarding/starwars-logo.png")}
        style={styles.image}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
  },
  image: {
    width: "35%",
    height: 50,
  },
  text: {
    color: "#fff",
  },
});
