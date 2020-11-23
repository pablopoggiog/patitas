import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AuthenticationScreen,
  LoginScreen,
  SignupScreen,
  ListScreen,
  CandidateScreen,
  // ChatScreen,
} from "@/screens";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Lista" component={ListScreen} />
        <Screen name="Patitas" component={AuthenticationScreen} />
        <Screen name="Ingresar" component={LoginScreen} />
        <Screen name="Registrate" component={SignupScreen} />
        <Screen name="Candidato" component={CandidateScreen} />
        {/* <Screen name="Chat" component={ChatScreen} /> */}
      </Navigator>
    </NavigationContainer>
  );
}
