/** @format */

import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import StarshipScreen from "../../pages/screens/StarshipScreen";
import axios from "axios";
import { tint } from "@/constants/Colors";

const Starship = () => {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchStarships();
  }, [page]);

  const fetchStarships = async () => {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/starships/?page=${page}`
      );
      setStarships((prevStarships) => [
        ...prevStarships,
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
        <ActivityIndicator size="large" color={tint} />
      ) : (
        <StarshipScreen
          starships={starships}
          loading={loading}
          isRefreshing={isRefreshing}
          handleLoadMore={handleLoadMore}
        />
      )}
    </View>
  );
};

export default Starship;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    borderTopColor: tint,
    borderTopWidth: 1,
  },
});
