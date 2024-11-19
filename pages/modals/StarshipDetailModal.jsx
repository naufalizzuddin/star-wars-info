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

const StarshipDetailModal = ({
  visible,
  onClose,
  starshipDetails,
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
            starshipDetails && (
              <>
                <Text style={styles.modalTitle}>{starshipDetails.name}</Text>
                <View style={styles.detailsContainer}>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Model:</Text>{" "}
                    {starshipDetails.model}
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Manufacturer:</Text>{" "}
                    {starshipDetails.manufacturer}
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Cost in Credits:</Text>{" "}
                    {starshipDetails.cost_in_credits}
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Length:</Text>{" "}
                    {starshipDetails.length} m
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Max Speed:</Text>{" "}
                    {starshipDetails.max_atmosphering_speed} km/h
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Crew:</Text>{" "}
                    {starshipDetails.crew}
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Passengers:</Text>{" "}
                    {starshipDetails.passengers}
                  </Text>
                  <Text style={styles.modalDescription}>
                    <Text style={styles.label}>Hyperdrive Rating:</Text>{" "}
                    {starshipDetails.hyperdrive_rating}
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

export default StarshipDetailModal;
