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
import { tint } from "../../constants/Colors";
import PlanetDetailModal from "../modals/PlanetDetailModal";

const PlanetScreen = ({ planets, isRefreshing, loading, handleLoadMore }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [planetDetails, setPlanetDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

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
      style={styles.itemContainer}
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

  return (
    <View style={styles.container}>
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
  itemContainer: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: 20,
    justifyContent: "center",
  },
  planetName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#eb7734",
    textAlign: "center",
  },
});

export default PlanetScreen;
