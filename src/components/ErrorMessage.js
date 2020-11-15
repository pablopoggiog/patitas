import React, { useEffect, useRef } from "react";
import { Text, Animated } from "react-native";

export const ErrorMessage = ({ show, text }) => {
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    show &&
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
  }, [fadeIn, show]);

  return (
    <Animated.View style={{ opacity: fadeIn }}>
      <Text style={{ color: "red" }}>{text}</Text>
    </Animated.View>
  );
};
