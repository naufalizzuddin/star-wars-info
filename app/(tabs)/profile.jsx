/** @format */

import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../../context/UserContext";
import { tint } from "../../constants/Colors";
import { Linking } from "react-native";

const Profile = () => {
  const { user } = useContext(UserContext);

  const openLink = (platform) => {
    if (platform === "github") {
      url = "https://github.com/naufalizzuddin";
    } else if (platform === "linkedin") {
      url = "https://www.linkedin.com/in/naufal-izzuddin-taufik-b5b931225/";
    } else {
      console.error("Platform tidak dikenali");
      return;
    }
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require("../../assets/profile/profileBackground.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.overlay} />
        <ScrollView>
          <View style={styles.main}>
            <Text style={styles.user}>
              Hi, {user == null || user == "" ? "User" : user}
            </Text>
            <Text style={styles.description}>
              "Star Wars Info" is a streamlined app for fans of the Star Wars
              universe, offering quick and easy access to essential information
              about characters, planets, and starships. Powered by data from the
              Star Wars API (SWAPI), the app provides:
            </Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionHeader}>Features:</Text>
              <View style={styles.bulletContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Character Profiles: Get concise information about popular and
                  lesser-known characters from across the Star Wars saga.
                </Text>
              </View>
              <View style={styles.bulletContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Planet Details: Explore various planets, including data on
                  climates, populations, and terrains.
                </Text>
              </View>
              <View style={styles.bulletContainer}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Starship Specs: Discover specifications and details for iconic
                  starships that make up the Star Wars galaxy.
                </Text>
              </View>
            </View>
            <Text style={styles.description}>
              Designed for ease of use, "Star Wars Info" delivers an informative
              experience for fans who want quick access to Star Wars data,
              whether they’re casual fans or avid enthusiasts. Dive in and
              explore the galaxy right from your device!
            </Text>
          </View>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{
                uri: "https://media.licdn.com/dms/image/v2/C5603AQFwZuii2KYpCw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1636251263633?e=1735776000&v=beta&t=8-UVlgrQkjIQIRX-UQv5UmgSsvvd4NIdWgKY-18IirU",
              }}
            />
            <Text style={styles.text}>Naufal Izzuddin Taufik</Text>
            <Text style={styles.text}>21120122140102</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => openLink("github")}>
                <Image
                  source={require("../../assets/profile/Github.png")}
                  style={styles.smallButton}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openLink("linkedin")}>
                <Image
                  source={require("../../assets/profile/LinkedIn.png")}
                  style={styles.smallButton}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
    backgroundColor: "transparent",
    borderTopWidth: 1,
    borderTopColor: tint,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  user: {
    color: tint,
    fontSize: 24,
    marginTop: 10,
  },
  description: {
    color: tint,
    fontSize: 16,
    marginTop: 10,
    backgroundColor: "transparent",
    marginHorizontal: 10,
    textAlign: "justify",
  },
  container: {
    alignItems: "center",
    overflow: "hidden",
    marginVertical: 50,
  },
  text: {
    textAlign: "center",
    color: tint,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 15,
  },
  smallButton: {
    height: 35,
    width: 35,
    marginTop: 6,
    marginHorizontal: 5,
  },
  descriptionContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  descriptionHeader: {
    color: tint,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginHorizontal: 10,
  },
  bulletContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 4,
    marginHorizontal: 12,
  },
  bullet: {
    color: tint,
    fontSize: 16,
    marginRight: 8,
  },
  bulletText: {
    color: tint,
    fontSize: 16,
    flexShrink: 1,
    textAlign: "justify",
  },
});
