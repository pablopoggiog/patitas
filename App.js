import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthenticationScreen } from "./src/screens/Authentication";
import { LoginScreen } from "./src/screens/Login";
import { SignupScreen } from "./src/screens/Signup";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Patitas" component={AuthenticationScreen} />
        <Screen name="Ingresar" component={LoginScreen} />
        <Screen name="Registrate" component={SignupScreen} />
      </Navigator>
    </NavigationContainer>
  );
}
