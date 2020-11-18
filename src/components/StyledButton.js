import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export const StyledButton = ({ onPress, text, disabled, style }) => (
  <TouchableOpacity
    disabled={disabled}
    style={[disabled ? styles.disabledButton : styles.enabledButton, style]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  enabledButton: {
    margin: 20,
    width: "30%",
    backgroundColor: "#007BFF",
    borderRadius: 20,
    color: "white",
    elevation: 12,
  },
  disabledButton: {
    margin: 20,
    width: "30%",
    backgroundColor: "grey",
    borderRadius: 20,
    color: "white",
    elevation: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    margin: 15,
    textAlign: "center",
  },
});
