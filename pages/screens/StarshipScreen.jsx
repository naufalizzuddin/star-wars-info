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
      style={styles.itemContainer}
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

  return (
    <View style={styles.container}>
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
  starshipName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#eb7734",
    textAlign: "center",
  },
});

export default StarshipScreen;
