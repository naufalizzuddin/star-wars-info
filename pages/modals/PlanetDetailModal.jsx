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

const PlanetDetailModal = ({
  visible,
  onClose,
  planetDetails,
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
            planetDetails && (
              <>
                <Text style={styles.modalTitle}>{planetDetails.name}</Text>
                <Text style={styles.modalDescription}>
                  Diameter: {planetDetails.diameter} km
                </Text>
                <Text style={styles.modalDescription}>
                  Climate: {planetDetails.climate}
                </Text>
                <Text style={styles.modalDescription}>
                  Gravity: {planetDetails.gravity}
                </Text>
                <Text style={styles.modalDescription}>
                  Population: {planetDetails.population}
                </Text>
                <Text style={styles.modalDescription}>
                  Surface Water: {planetDetails.surface_water}%
                </Text>
                <Text style={styles.modalDescription}>
                  Terrain: {planetDetails.terrain}
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

export default PlanetDetailModal;
