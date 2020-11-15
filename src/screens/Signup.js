import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { validate } from "../utils/functions";
import { StyledButton } from "../components";

export const SignupScreen = () => {
  const [authenticationData, setAuthenticationData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = authenticationData;

  const [submittable, setSubmittable] = useState(false);

  const onSubmit = () => console.log("the signup state is", authenticationData);

  const onChangeEmail = (text) => {
    setAuthenticationData({ ...authenticationData, email: text });
    validate(text, password, setSubmittable, confirmPassword);
  };

  const onChangePassword = (text) => {
    setAuthenticationData({ ...authenticationData, password: text });
    validate(email, text, setSubmittable, confirmPassword);
  };

  const onChangeConfirmPassword = (text) => {
    setAuthenticationData({ ...authenticationData, confirmPassword: text });
    validate(email, password, setSubmittable, text);
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
      <Text style={styles.text}>Repeti la contraseña:</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.text}
        placeholder="******"
        onChangeText={onChangeConfirmPassword}
      ></TextInput>
      <StyledButton
        disabled={!submittable}
        onPress={onSubmit}
        text="Comenzar"
      />
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
