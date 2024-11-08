/** @format */

import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);
  return (
    <SafeAreaView>
      <View>
        <Text>Hi, {user == null || user == "" ? "User" : user}</Text>
        <Text>Star Wars Info merupakan sebuah aplikasi untuk mengetahui</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
