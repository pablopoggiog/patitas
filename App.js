import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "@/firebase/config";
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
            setLoading(false);
            console.log("userData es", userData);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
            console.log("EL USER dio error, ", error);
          });
      } else {
        setLoading(false);
        console.log("EL USER NO ESTA");
      }
    });
  }, []);

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
        {/* <Screen name="Chat" component={ChatScreen} /> */}
      </Navigator>
    </NavigationContainer>
  );
}
