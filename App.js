import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "@/firebase/config";
import {
  AuthenticationScreen,
  LoginScreen,
  SignupScreen,
  ListScreen,
  CandidateScreen,
} from "@/screens";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <></>;

  return (
    <NavigationContainer>
      <Navigator>
        {user ? (
          <>
            <Screen
              name="Lista"
              options={{ user: user }}
              component={ListScreen}
            />
            <Screen name="Candidato" component={CandidateScreen} />
          </>
        ) : (
          <>
            <Screen name="Patitas" component={AuthenticationScreen} />
            <Screen name="Ingresar" component={LoginScreen} />
            <Screen name="Registrate" component={SignupScreen} />
            <Screen name="Lista" component={ListScreen} />
            <Screen name="Candidato" component={CandidateScreen} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
}

// return (
//   <NavigationContainer>
//     <Navigator>
//       <Screen name="Patitas" component={AuthenticationScreen} />
//       <Screen name="Ingresar" component={LoginScreen} />
//       <Screen name="Registrate" component={SignupScreen} />
//       <Screen name="Lista" component={ListScreen} />
//       <Screen name="Candidato" component={CandidateScreen} />
//       {/* <Screen name="Chat" component={ChatScreen} /> */}
//     </Navigator>
//   </NavigationContainer>
// );
