import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Button } from "react-native";
import { ListItem, Spinner } from "@/components";
import background from "@/assets/1.jpg";
import { fetchCandidatesList } from "@/firebase/functions";

export const ListScreen = ({ navigation: { navigate } }) => {
  const [list, setList] = useState(null);

  useEffect(() => {
    fetchCandidatesList(setList);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.backgroundImage} source={background}></Image>
      {list ? (
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            {Object.entries(list).map(
              ([id, { image, name, shortDescription }]) => {
                return (
                  <ListItem
                    key={id}
                    id={id}
                    navigate={navigate}
                    photo={image}
                    name={name}
                    shortDescription={shortDescription}
                  />
                );
              }
            )}
          </View>
        </ScrollView>
      ) : (
        <Spinner />
      )}
      <Button
        style={styles.bottomButton}
        title="NUEVO"
        onPress={() => navigate("Nuevo")}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.05,
  },
  bottomButton: {
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
});
