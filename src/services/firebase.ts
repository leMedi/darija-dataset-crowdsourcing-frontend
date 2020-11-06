import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyB_QBuvoD7hiupYjn3a1-rzFkLQLWrI2P8",
  authDomain: "darija--dataset.firebaseapp.com",
  databaseURL: "https://darija--dataset.firebaseio.com",
  projectId: "darija--dataset",
  storageBucket: "darija--dataset.appspot.com",
  messagingSenderId: "327792952069",
  appId: "1:327792952069:web:002c305b8d94c7e6ee6d6c",
  measurementId: "G-P1JNYRQ6FP"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const db = firebase.firestore();

export function login(email: string, password: string) {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password)
}