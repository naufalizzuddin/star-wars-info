/** @format */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { tint } from "../../constants/Colors";
import FilmDetailModal from "../modals/FilmDetailModal";

const FilmScreen = ({ films }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [filmDetails, setFilmDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [fontsLoaded] = useFonts({
    "Oswald-Regular": require("../../assets/fonts/Oswald-Regular.ttf"),
    "Oswald-Bold": require("../../assets/fonts/Oswald-Bold.ttf"),
  });

  const fetchFilmDetails = async (url) => {
    try {
      setLoadingDetails(true);
      const response = await fetch(url);
      const data = await response.json();
      setFilmDetails(data);
    } catch (error) {
      console.error("Error fetching film details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const renderFilmItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        setSelectedFilm(item);
        fetchFilmDetails(item.url);
        setModalVisible(true);
      }}
    >
      <Text style={styles.filmName}>{item.title}</Text>
    </TouchableOpacity>
  );

  const closeModal = () => {
    setModalVisible(false);
    setSelectedFilm(null);
    setFilmDetails(null);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={tint} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Films</Text>
      <FlatList
        data={films}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderFilmItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />

      <FilmDetailModal
        visible={modalVisible}
        onClose={closeModal}
        filmDetails={filmDetails}
        loadingDetails={loadingDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    fontFamily: "Oswald-Bold",
    color: tint,
    textAlign: "center",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cardContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  filmName: {
    fontSize: 16,
    fontFamily: "Oswald-Bold",
    color: tint,
    textAlign: "center",
  },
  endMessage: {
    fontSize: 14,
    fontFamily: "Oswald-Regular",
    color: "#ccc",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default FilmScreen;
