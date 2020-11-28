import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { CommonActions } from "@react-navigation/native";
import background from "@/assets/1.jpg";
import upload from "@/assets/upload.png";
import { pickImage, uploadInfo } from "@/firebase/functions";
import { UserContext } from "@/contexts/user";

export const PublisherScreen = ({ navigation: { dispatch } }) => {
  const [userId, setUserId] = useContext(UserContext);

  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");

  const onChangeName = (name) => setName(name);

  const onChangeShortDescription = (shortDescription) =>
    setShortDescription(shortDescription);

  const onChangeDescription = (description) => setDescription(description);

  const onChoosePic = async () => {
    setImageUri(await pickImage(userId));
  };

  const onSubmit = () => {
    uploadInfo(userId, name, shortDescription, description, imageUri);
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Lista",
          },
          {
            name: "Candidato",
            params: {
              id: userId + name,
              name,
            },
          },
        ],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={background}></Image>

      <TouchableOpacity style={styles.image} onPress={onChoosePic}>
        <Image
          style={styles.image}
          source={imageUri ? { uri: imageUri } : upload}
        ></Image>
      </TouchableOpacity>

      <TextInput
        onChangeText={onChangeName}
        placeholder="Name"
        style={styles.title}
      ></TextInput>

      <TextInput
        onChangeText={onChangeShortDescription}
        placeholder="Short description"
        style={styles.text}
      ></TextInput>

      <TextInput
        onChangeText={onChangeDescription}
        placeholder="Description"
        style={styles.text}
      ></TextInput>

      <Button title="Subir" onPress={onSubmit} style={styles.link}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 70,
  },
  text: {
    fontSize: 17,
    textAlign: "center",
    flex: 1,
    alignItems: "flex-start",
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  link: {
    color: "#007BFF",
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
