/** @format */

import React, { useState } from "react";
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
import PlanetDetailModal from "../modals/PlanetDetailModal";

const PlanetScreen = ({ planets, isRefreshing, loading, handleLoadMore }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [planetDetails, setPlanetDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [fontsLoaded] = useFonts({
    "Oswald-Regular": require("../../assets/fonts/Oswald-Regular.ttf"),
    "Oswald-Bold": require("../../assets/fonts/Oswald-Bold.ttf"),
  });

  const fetchPlanetDetails = async (url) => {
    try {
      setLoadingDetails(true);
      const response = await fetch(url);
      const data = await response.json();
      setPlanetDetails(data);
    } catch (error) {
      console.error("Error fetching planet details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const renderPlanetItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        setSelectedPlanet(item);
        fetchPlanetDetails(item.url);
        setModalVisible(true);
      }}
    >
      <Text style={styles.planetName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlanet(null);
    setPlanetDetails(null);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={tint} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planets</Text>
      <FlatList
        data={planets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPlanetItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        numColumns={2}
        ListFooterComponent={
          isRefreshing ? <ActivityIndicator size="small" color={tint} /> : null
        }
        columnWrapperStyle={styles.columnWrapper}
      />

      <PlanetDetailModal
        visible={modalVisible}
        onClose={closeModal}
        planetDetails={planetDetails}
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
  planetName: {
    fontSize: 16,
    fontFamily: "Oswald-Bold",
    color: tint,
    textAlign: "center",
  },
});

export default PlanetScreen;
