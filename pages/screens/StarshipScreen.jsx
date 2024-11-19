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
import StarshipDetailModal from "../modals/StarshipDetailModal";

const StarshipScreen = ({
  starships,
  isRefreshing,
  loading,
  handleLoadMore,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStarship, setSelectedStarship] = useState(null);
  const [starshipDetails, setStarshipDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [fontsLoaded] = useFonts({
    "Oswald-Regular": require("../../assets/fonts/Oswald-Regular.ttf"),
    "Oswald-Bold": require("../../assets/fonts/Oswald-Bold.ttf"),
  });

  const fetchStarshipDetails = async (url) => {
    try {
      setLoadingDetails(true);
      const response = await fetch(url);
      const data = await response.json();
      setStarshipDetails(data);
    } catch (error) {
      console.error("Error fetching starship details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const renderStarshipItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        setSelectedStarship(item);
        fetchStarshipDetails(item.url);
        setModalVisible(true);
      }}
    >
      <Text style={styles.starshipName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStarship(null);
    setStarshipDetails(null);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={tint} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Starships</Text>
      <FlatList
        data={starships}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderStarshipItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        numColumns={2}
        ListFooterComponent={
          isRefreshing ? <ActivityIndicator size="small" color={tint} /> : null
        }
        columnWrapperStyle={styles.columnWrapper}
      />

      <StarshipDetailModal
        visible={modalVisible}
        onClose={closeModal}
        starshipDetails={starshipDetails}
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
  starshipName: {
    fontSize: 16,
    fontFamily: "Oswald-Bold",
    color: tint,
    textAlign: "center",
  },
});

export default StarshipScreen;
