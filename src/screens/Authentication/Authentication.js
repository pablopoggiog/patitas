import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StyledButton } from "@/components";
import background from "@/assets/1.jpg";
import { AnimatedLogo } from "./components/AnimatedLogo";

export const AuthenticationScreen = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={background}></Image>
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
    paddingTop: "30%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingTop: "20%",
  },
  bottomText: {
    flexDirection: "row",
    paddingTop: "20%",
  },
  link: { color: "#007BFF" },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.05,
  },
});
