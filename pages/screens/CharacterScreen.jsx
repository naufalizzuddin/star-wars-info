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
import CharacterDetailModal from "../modals/CharacterDetailModal";

const CharacterScreen = ({
  characters,
  isRefreshing,
  loading,
  handleLoadMore,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterDetails, setCharacterDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const fetchCharacterDetails = async (url) => {
    try {
      setLoadingDetails(true);
      const response = await fetch(url);
      const data = await response.json();
      setCharacterDetails(data);
    } catch (error) {
      console.error("Error fetching character details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const renderCharacterItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedCharacter(item);
        fetchCharacterDetails(item.url);
        setModalVisible(true);
      }}
    >
      <Text style={styles.characterName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCharacter(null);
    setCharacterDetails(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCharacterItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        numColumns={2}
        ListFooterComponent={
          isRefreshing ? <ActivityIndicator size="small" color={tint} /> : null
        }
      />

      <CharacterDetailModal
        visible={modalVisible}
        onClose={closeModal}
        characterDetails={characterDetails}
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
  characterName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#eb7734",
    textAlign: "center",
  },
});

export default CharacterScreen;
