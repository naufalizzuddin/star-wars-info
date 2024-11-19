/** @format */

import React from "react";
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { tint } from "../../constants/Colors";

const FilmDetailModal = ({ visible, onClose, filmDetails, loadingDetails }) => {
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
            filmDetails && (
              <>
                <ScrollView style={styles.scrollView}>
                  <Text style={styles.modalTitle}>{filmDetails.title}</Text>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.modalDescription}>
                      <Text style={styles.label}>Episode:</Text>{" "}
                      {filmDetails.episode_id}
                    </Text>
                    <Text style={styles.modalDescription}>
                      <Text style={styles.label}>Director:</Text>{" "}
                      {filmDetails.director}
                    </Text>
                    <Text style={styles.modalDescription}>
                      <Text style={styles.label}>Producer(s):</Text>{" "}
                      {filmDetails.producer}
                    </Text>
                    <Text style={styles.modalDescription}>
                      <Text style={styles.label}>Release Date:</Text>{" "}
                      {filmDetails.release_date}
                    </Text>
                    <Text style={styles.modalDescription}>
                      <Text style={styles.label}>Opening Crawl:</Text>
                      {"\n"}
                      {filmDetails.opening_crawl}
                    </Text>
                  </View>
                </ScrollView>
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
    borderColor: tint,
    borderWidth: 1,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    maxHeight: "80%",
    paddingHorizontal: 60,
  },
  scrollView: {
    width: "100%",
    marginBottom: 15,
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
    lineHeight: 22,
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
    width: "80%",
    alignSelf: "center",
  },
  modalButtonText: {
    fontFamily: "Oswald-Bold",
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },
});

export default FilmDetailModal;
