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
              Star Wars Info adalah aplikasi mobile yang dibuat khusus untuk
              para penggemar Star Wars, memungkinkan mereka menemukan berbagai
              informasi menarik tentang dunia Star Wars. Aplikasi ini memiliki
              antarmuka yang sederhana, memudahkan pengguna untuk menemukan data
              lengkap tentang karakter, planet, starship, dan elemen lain yang
              ikonik dari cerita ini. Semua informasi diambil dari SWAPI (Star
              Wars API) sehingga selalu akurat dan terbaru.
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
    marginTop: 50,
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
});
