import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StyledButton } from "@/components";
import { AnimatedLogo } from "./components/AnimatedLogo";

export const AuthenticationScreen = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.container}>
      <AnimatedLogo />

      <Text style={styles.text}>Te extrañamos!</Text>

      <View style={styles.buttonsContainer}>
        <StyledButton onPress={() => navigate("Ingresar")} text="Ingresar" />
        <StyledButton
          onPress={() => navigate("Registrate")}
          text="Registrarme"
        />
      </View>

      <View style={styles.bottomText}>
        <Text>Necesitas ayuda? </Text>

        <Text onPress={() => navigate("Contacto")} style={styles.link}>
          Contacto
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "40%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 100,
  },
  bottomText: {
    flexDirection: "row",
    paddingTop: "40%",
  },
  link: { color: "#007BFF" },
});
