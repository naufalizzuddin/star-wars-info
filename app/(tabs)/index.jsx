/** @format */

import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import CharacterScreen from "../../pages/CharacterScreen";
import axios from "axios";
import { tint } from "@/constants/Colors";

const Index = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`
      );
      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...response.data.results,
      ]);
      setLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      setPage((prevPage) => prevPage + 1);
    } else {
      return new Error();
    }
  };

  return (
    <View style={styles.container}>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <CharacterScreen
          characters={characters}
          loading={loading}
          isRefreshing={isRefreshing}
          handleLoadMore={handleLoadMore}
        />
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    borderTopColor: tint,
    borderTopWidth: 1,
  },
});
