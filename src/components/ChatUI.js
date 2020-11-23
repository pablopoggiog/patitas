import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ChatUI = ({ messages }) => {
  return (
    <View style={styles.container}>
      {messages.map((message) => (
        <Text style={styles.text}>{message}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    margin: 15,
    textAlign: "center",
  },
});
