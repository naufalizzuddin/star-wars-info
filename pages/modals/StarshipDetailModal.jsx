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
import { tint } from "../../constants/Colors";

const StarshipDetailModal = ({
  visible,
  onClose,
  starshipDetails,
  loadingDetails,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
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
                <Text style={styles.modalDescription}>
                  Model: {starshipDetails.model}
                </Text>
                <Text style={styles.modalDescription}>
                  Manufacturer: {starshipDetails.manufacturer}
                </Text>
                <Text style={styles.modalDescription}>
                  Cost in Credits: {starshipDetails.cost_in_credits}
                </Text>
                <Text style={styles.modalDescription}>
                  Length: {starshipDetails.length} m
                </Text>
                <Text style={styles.modalDescription}>
                  Max Speed: {starshipDetails.max_atmosphering_speed} km/h
                </Text>
                <Text style={styles.modalDescription}>
                  Crew: {starshipDetails.crew}
                </Text>
                <Text style={styles.modalDescription}>
                  Passengers: {starshipDetails.passengers}
                </Text>
                <Text style={styles.modalDescription}>
                  Hyperdrive Rating: {starshipDetails.hyperdrive_rating}
                </Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: tint,
  },
  modalDescription: {
    fontSize: 16,
    color: tint,
    marginBottom: 5,
  },
  modalButton: {
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    width: 100,
  },
  modalButtonText: {
    color: tint,
    fontSize: 18,
    textAlign: "center",
  },
});

export default StarshipDetailModal;
