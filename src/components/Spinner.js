import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

export const Spinner = () => (
  <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />
);

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});
