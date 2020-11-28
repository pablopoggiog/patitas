import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "@/firebase/config";
import { UserContext } from "@/contexts/user";
import {
  AuthenticationScreen,
  LoginScreen,
  SignupScreen,
  ListScreen,
  CandidateScreen,
  PublisherScreen,
} from "@/screens";

const { Provider } = UserContext;

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user is", user);
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUserId(userData.id);
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

  //   return (
  //     <Provider value={user.id}>
  //       <NavigationContainer>
  //         <Navigator>
  //           {user ? (
  //             <>
  //               <Screen
  //                 name="Lista"
  //                 options={{ user: user }}
  //                 component={ListScreen}
  //               />
  //               <Screen name="Candidato" component={CandidateScreen} />
  //               <Screen name="Editor" component={EditorScreen} />
  //             </>
  //           ) : (
  //             <>
  //               <Screen name="Patitas" component={AuthenticationScreen} />
  //               <Screen name="Ingresar" component={LoginScreen} />
  //               <Screen name="Registrate" component={SignupScreen} />
  //               <Screen name="Lista" component={ListScreen} />
  //               <Screen name="Candidato" component={CandidateScreen} />
  //             </>
  //           )}
  //         </Navigator>
  //       </NavigationContainer>
  //     </Provider>
  //   );
  // }

  return (
    <Provider value={[userId, setUserId]}>
      <NavigationContainer>
        <Navigator>
          {/* <Screen name="Patitas" component={AuthenticationScreen} />
          <Screen name="Ingresar" component={LoginScreen} />
          <Screen name="Registrate" component={SignupScreen} /> */}
          <Screen name="Lista" component={ListScreen} />
          <Screen name="Candidato" component={CandidateScreen} />
          <Screen name="Nuevo" component={PublisherScreen} />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}
