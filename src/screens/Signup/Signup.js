import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Keyboard,
} from "react-native";
import { validate } from "@/utils";
import { StyledButton, ErrorMessage } from "@/components";
import background from "@/assets/1.jpg";

export const SignupScreen = () => {
  const [authenticationData, setAuthenticationData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = authenticationData;

  const [submittable, setSubmittable] = useState(false);

  const [warnings, setWarnings] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const onSubmit = () => {
    console.log("the signup state is", authenticationData);
    Keyboard.dismiss();
  };

  const onChangeEmail = (text) => {
    setAuthenticationData({ ...authenticationData, email: text });
    validate(text, password, setSubmittable, setWarnings, confirmPassword);
  };

  const onChangePassword = (text) => {
    setAuthenticationData({ ...authenticationData, password: text });
    validate(email, text, setSubmittable, setWarnings, confirmPassword);
  };

  const onChangeConfirmPassword = (text) => {
    setAuthenticationData({ ...authenticationData, confirmPassword: text });
    validate(email, password, setSubmittable, setWarnings, text);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={background}></Image>
      <Text style={styles.text}>Tu email:</Text>
      <TextInput
        keyboardType="email-address"
        textContentType="emailAddress"
        style={styles.text}
        placeholder="email@email.com"
        onChangeText={onChangeEmail}
      ></TextInput>

      <ErrorMessage show={!!warnings.email} text={warnings.email} />

      <Text style={styles.text}>Contraseña:</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.text}
        placeholder="******"
        onChangeText={onChangePassword}
      ></TextInput>

      <ErrorMessage show={!!warnings.password} text={warnings.password} />

      <Text style={styles.text}>Repeti la contraseña:</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.text}
        placeholder="******"
        onChangeText={onChangeConfirmPassword}
      ></TextInput>

      <ErrorMessage
        show={!!warnings.confirmPassword}
        text={warnings.confirmPassword}
      />

      <StyledButton
        disabled={!submittable}
        style={styles.submitButton}
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
  submitButton: {
    width: "50%",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.05,
  },
});
