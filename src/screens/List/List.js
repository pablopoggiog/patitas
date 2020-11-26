import React, { useEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { ListItem } from "@/components";
import background from "@/assets/1.jpg";
import { data } from "@/utils";

export const ListScreen = ({ navigation: { navigate }, user}) => {
  useEffect(() => {
    console.log("DESDE LISTA EL USER ES", user);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={background}></Image>
        {data.map(({ id, photo, name, shortDescription }) => (
          <ListItem
            key={id}
            id={id}
            navigate={navigate}
            photo={photo}
            name={name}
            shortDescription={shortDescription}
          />
        ))}
      </View>
    </ScrollView>
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
});
