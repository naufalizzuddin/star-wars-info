/** @format */

import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import FilmScreen from "../../pages/screens/FilmScreen";
import axios from "axios";
import { tint } from "@/constants/Colors";

const Film = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchFilms();
  }, [page]);

  const fetchFilms = async () => {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/films/?page=${page}`
      );
      setFilms((prevFilms) => [...prevFilms, ...response.data.results]);
      setLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      setLoading(false);
      setIsRefreshing(false);
      console.error("Error fetching films:", error);
    }
  };

  const handleLoadMore = () => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color={tint} />
      ) : (
        <FilmScreen
          films={films}
          loading={loading}
          isRefreshing={isRefreshing}
          handleLoadMore={handleLoadMore}
        />
      )}
    </View>
  );
};

export default Film;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    borderTopColor: tint,
    borderTopWidth: 1,
  },
});
