import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { validate } from "../utils/functions";
import { StyledButton } from "../components";

export const LoginScreen = () => {
  const [authenticationData, setAuthenticationData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = authenticationData;

  const [submittable, setSubmittable] = useState(false);

  const onSubmit = () => console.log("the login state is", authenticationData);

  const onChangeEmail = (text) => {
    setAuthenticationData({ ...authenticationData, email: text });
    validate(text, password, setSubmittable);
  };

  const onChangePassword = (text) => {
    setAuthenticationData({ ...authenticationData, password: text });
    validate(email, text, setSubmittable);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tu email:</Text>
      <TextInput
        keyboardType="email-address"
        textContentType="emailAddress"
        style={styles.text}
        placeholder="email@email.com"
        onChangeText={onChangeEmail}
      ></TextInput>
      <Text style={styles.text}>Contraseña:</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.text}
        placeholder="******"
        onChangeText={onChangePassword}
      ></TextInput>
      <StyledButton disabled={!submittable} onPress={onSubmit} text="Entrar" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    margin: 25,
    textAlign: "center",
  },
});
