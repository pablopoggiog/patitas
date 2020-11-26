import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhluqIDK-3OccHAHrBOJJWw0X766QTHWQ",
  authDomain: "patitas-mobile.firebaseapp.com",
  databaseURL: "https://patitas-mobile.firebaseio.com",
  projectId: "patitas-mobile",
  storageBucket: "patitas-mobile.appspot.com",
  messagingSenderId: "752907889610",
  appId: "1:752907889610:web:c7705663859ad72d983d33",
  measurementId: "G-NML7C79B9J",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
