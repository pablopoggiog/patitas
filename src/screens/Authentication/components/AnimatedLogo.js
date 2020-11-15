import React, { useRef, useEffect } from "react";
import { Animated, Image } from "react-native";

export const AnimatedLogo = () => {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const bounce = useRef(new Animated.Value(0)).current;

  const inputRange = [0, 1];
  const outputRange = [0, 1];
  const scale = bounce.interpolate({ inputRange, outputRange });

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(bounce, {
          toValue: 2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeIn, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(bounce, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeIn, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [bounce, fadeIn]);

  return (
    <Animated.View style={{ transform: [{ scale }], opacity: fadeIn }}>
      <Image
        width="100px"
        source={require("../../../assets/paw.png")}
        style={{ width: 70, height: 70, marginBottom: 70 }}
      />
    </Animated.View>
  );
};
