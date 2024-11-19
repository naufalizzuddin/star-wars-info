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

  const [fontsLoaded] = useFonts({
    "Oswald-Regular": require("../../assets/fonts/Oswald-Regular.ttf"),
    "Oswald-Bold": require("../../assets/fonts/Oswald-Bold.ttf"),
  });

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
      style={styles.cardContainer}
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

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={tint} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters</Text>
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
        columnWrapperStyle={styles.columnWrapper}
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
  characterName: {
    fontSize: 16,
    fontFamily: "Oswald-Bold",
    color: tint,
    textAlign: "center",
  },
});

export default CharacterScreen;
