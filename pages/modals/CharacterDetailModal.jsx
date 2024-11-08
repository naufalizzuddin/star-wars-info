/** @format */

import React from "react";
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { tint } from "../../constants/Colors";

const CharacterDetailModal = ({
  visible,
  onClose,
  characterDetails,
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
            characterDetails && (
              <>
                <Text style={styles.modalTitle}>{characterDetails.name}</Text>
                <Text style={styles.modalDescription}>
                  Height: {characterDetails.height} cm
                </Text>
                <Text style={styles.modalDescription}>
                  Weight: {characterDetails.mass} kg
                </Text>
                <Text style={styles.modalDescription}>
                  Hair Color: {characterDetails.hair_color}
                </Text>
                <Text style={styles.modalDescription}>
                  Skin Color: {characterDetails.skin_color}
                </Text>
                <Text style={styles.modalDescription}>
                  Eye Color: {characterDetails.eye_color}
                </Text>
                <Text style={styles.modalDescription}>
                  Birth Year: {characterDetails.birth_year}
                </Text>
                <Text style={styles.modalDescription}>
                  Gender: {characterDetails.gender}
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

export default CharacterDetailModal;
