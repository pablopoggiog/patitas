import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export const StyledButton = ({ onPress, text, disabled }) => (
  <TouchableOpacity
    disabled={disabled}
    style={disabled ? styles.disabledButton : styles.enabledButton}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  enabledButton: {
    marginTop: 90,
    width: "50%",
    backgroundColor: "#007BFF",
    borderRadius: 20,
    color: "white",
  },
  disabledButton: {
    marginTop: 90,
    width: "50%",
    backgroundColor: "grey",
    borderRadius: 20,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    margin: 15,
    textAlign: "center",
  },
});
