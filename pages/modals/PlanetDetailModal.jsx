/** @format */

import React from "react";
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import { tint } from "../../constants/Colors";

const PlanetDetailModal = ({
  visible,
  onClose,
  planetDetails,
  loadingDetails,
}) => {
  const [fontsLoaded] = useFonts({
    "Oswald-Regular": require("../../assets/fonts/Oswald-Regular.ttf"),
    "Oswald-Bold": require("../../assets/fonts/Oswald-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={tint} />;
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {loadingDetails ? (
            <ActivityIndicator size="large" color={tint} />
          ) : (
            planetDetails && (
              <>
                <Text style={styles.modalTitle}>{planetDetails.name}</Text>
                <View style={styles.detailsContainer}>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Diameter:</Text>{" "}
                    {planetDetails.diameter} km
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Climate:</Text>{" "}
                    {planetDetails.climate}
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Gravity:</Text>{" "}
                    {planetDetails.gravity}
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Population:</Text>{" "}
                    {planetDetails.population}
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Surface Water:</Text>{" "}
                    {planetDetails.surface_water}%
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Terrain:</Text>{" "}
                    {planetDetails.terrain}
                  </Text>
                </View>
                <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#111",
    borderRadius: 15,
    alignItems: "center",
    borderColor: tint,
    borderWidth: 1,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 26,
    fontFamily: "Oswald-Bold",
    marginBottom: 15,
    color: tint,
    textTransform: "uppercase",
    textAlign: "center",
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    fontFamily: "Oswald-Regular",
    color: "#ddd",
    marginBottom: 8,
  },
  label: {
    fontFamily: "Oswald-Bold",
    color: tint,
  },
  modalButton: {
    backgroundColor: tint,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
    width: "60%",
  },
  modalButtonText: {
    fontFamily: "Oswald-Bold",
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },
});

export default PlanetDetailModal;
