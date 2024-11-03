/** @format */

import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const CharacterList = ({
  characters,
  isRefreshing,
  loading,
  handleLoadMore,
}) => {
  const renderCharacterItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.characterName}>{item.name}</Text>
      <Text style={styles.characterInfo}>Height: {item.height}</Text>
      <Text style={styles.characterInfo}>Mass: {item.mass}</Text>
      <Text style={styles.characterInfo}>Gender: {item.gender}</Text>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    color: "#eb7734",
    alignItems: "center",
  },
  characterName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#eb7734",
  },
  characterInfo: {
    fontSize: 12,
    color: "#eb7734",
  },
});

export default CharacterList;
