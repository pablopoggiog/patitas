import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { validate } from "@/utils";
import { StyledButton, ErrorMessage } from "@/components";
import { firebase } from "@/firebase/config";
import background from "@/assets/1.jpg";
import { UserContext } from "@/contexts/user";

export const LoginScreen = ({ navigation: { navigate, dispatch } }) => {
  const [authenticationData, setAuthenticationData] = useState({
    email: "",
    password: "",
  });

  const [userId, setUserId] = useContext(UserContext);

  const { email, password } = authenticationData;

  const [submittable, setSubmittable] = useState(false);

  const [warnings, setWarnings] = useState({ email: null, password: null });

  const onSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            console.log("the user is,", user);
            setUserId(user.id)
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
                      user,
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

  const onChangeEmail = (text) => {
    setAuthenticationData({ ...authenticationData, email: text });
    validate(text, password, setSubmittable, setWarnings);
  };

  const onChangePassword = (text) => {
    setAuthenticationData({ ...authenticationData, password: text });
    validate(email, text, setSubmittable, setWarnings);
  };

  const onFooterLinkPress = () => navigate("Registrate");

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
      />

      <ErrorMessage show={!!warnings.password} text={warnings.password} />

      <StyledButton
        disabled={!submittable}
        style={styles.submitButton}
        onPress={onSubmit}
        text="Entrar"
      />

      <View style={styles.footerView}>
        <Text>
          Aun no tenés una cuenta?{" "}
          <Text onPress={onFooterLinkPress} style={styles.link}>
            Registrate
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
  link: { color: "#007BFF" },
});
