import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export const ListItem = ({ id, navigate, photo, name, shortDescription }) => {
  const openElement = () => navigate("Candidato", { id, name });

  return (
    <TouchableOpacity onPress={openElement} style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.text}>{shortDescription}</Text>
      </View>
      <Image style={styles.image} source={{ uri: photo }}></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 13,
    margin: 15,
    textAlign: "center",
    flex: 1,
  },
});
