import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Spinner } from "@/components";
import background from "@/assets/1.jpg";
import { fetchCandidate } from "@/firebase/functions";

export const CandidateScreen = ({ navigation: { navigate }, route }) => {
  const { id, name } = route.params;

  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchCandidate(id, setImage, setDescription);
  }, [id]);

  if (!name || !description || !image)
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={background}></Image>
        <Spinner />
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={background}></Image>

        <Image
          style={styles.image}
          source={image ? { uri: image } : background}
        ></Image>

        <Text style={styles.title}>{name}</Text>

        <Text style={styles.text}>{description}</Text>

        <View style={styles.bottomText}>
          <Text>Queres conocerlo? </Text>

          <Text
            onPress={() => {
              // navigate("Chat"), { name: "asd" };
              console.log(
                "to be defined, most probably a deeplink to whatsapp while native chat isn't available"
              );
            }}
            style={styles.link}
          >
            Chatear con el dueño
          </Text>
        </View>
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
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 30,
  },
  text: {
    fontSize: 17,
    margin: 40,
    marginBottom: 0,
    textAlign: "center",
    flex: 1,
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
