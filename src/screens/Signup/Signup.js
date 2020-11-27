import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { validate } from "@/utils";
import { StyledButton, ErrorMessage } from "@/components";
import { firebase } from "@/firebase/config";
import background from "@/assets/1.jpg";

export const SignupScreen = ({ navigation: { navigate, dispatch } }) => {
  const [authenticationData, setAuthenticationData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { fullName, email, password, confirmPassword } = authenticationData;

  const [submittable, setSubmittable] = useState(false);

  const [warnings, setWarnings] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const onChangeFullName = (text) =>
    setAuthenticationData({ ...authenticationData, fullName: text });

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

  const onSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: "Patitas",
                  },
                  {
                    name: "Lista",
                    params: {
                      user: data,
                    },
                  },
                ],
              })
            );
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onFooterLinkPress = () => navigate("Ingresar");

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={background}></Image>

      <Text style={styles.text}>Tu nombre completo:</Text>
      <TextInput
        style={styles.text}
        placeholder="Pablo Gonzalez"
        onChangeText={onChangeFullName}
      ></TextInput>

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

      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          Ya tenés una cuenta?{" "}
          <Text onPress={onFooterLinkPress} style={styles.link}>
            Ingresar
          </Text>
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
  },
  text: {
    fontSize: 20,
    margin: 5,
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
  link: { color: "#007BFF" },
});
