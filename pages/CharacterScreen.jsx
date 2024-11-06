/** @format */

import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const CharacterScreen = ({
  characters,
  isRefreshing,
  loading,
  handleLoadMore,
}) => {
  const renderCharacterItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.characterName}>{item.name}</Text>
    </View>
  );

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
          isRefreshing ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : null
        }
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
    color: "#eb7734",
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
  characterInfo: {
    fontSize: 12,
    color: "#eb7734",
  },
});

export default CharacterScreen;
