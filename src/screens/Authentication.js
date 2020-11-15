import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StyledButton } from "../components";

export const AuthenticationScreen = ({ navigation: { navigate } }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        width="100px"
        source={require("../assets/paw.png")}
        style={{ width: 70, height: 70, marginBottom: 70 }}
      />
      <Text style={styles.text}>Te extrañamos!</Text>
      <View style={styles.buttonsContainer}>
        <StyledButton onPress={() => navigate("Ingresar")} text="Ingresar" />
        <StyledButton
          onPress={() => navigate("Registrate")}
          text="Registrarme"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 100,
  },
});
