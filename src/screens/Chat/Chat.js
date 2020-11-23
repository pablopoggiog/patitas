import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { ChatUI } from "@/components";

export const ChatScreen = () => {
  const [messages, setMessages] = useState(["asdfasdfa", "asdfasdfdf", "hola"]);

  const [currentMessage, setCurrentMessage] = useState("");

  const onSubmit = () => console.log("the new message is", currentMessage);

  const onChangeEmail = (text) => setCurrentMessage(text);

  return (
    <View style={styles.container}>
      <ChatUI messages={messages} onChangeText={onChangeEmail}></ChatUI>
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
