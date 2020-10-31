import * as firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyD_4csIX3VRtkV25ZRMIK09Y8ouWy-JygM",
  authDomain: "darija-dataset.firebaseapp.com",
  databaseURL: "https://darija-dataset.firebaseio.com",
  projectId: "darija-dataset",
  storageBucket: "darija-dataset.appspot.com",
  messagingSenderId: "591668647076",
  appId: "1:591668647076:web:1afeda33db301fed6d8231",
  measurementId: "G-MS5RCDLC10"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const db = firebase.firestore();

export function login(email: string, password: string) {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password)
}