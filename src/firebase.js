import firebase from "@firebase/app";
import "@firebase/auth";


export const auth = firebase.initializeApp({
  apiKey: "AIzaSyCww8qSTvEVK-PO2hd9IKlppPW9oXrPGfw",
  authDomain: "deligram-29827.firebaseapp.com",
  projectId: "deligram-29827",
  storageBucket: "deligram-29827.appspot.com",
  messagingSenderId: "1013322114443",
  appId: "1:1013322114443:web:df58ba80a31ab5d65bbb8e"
}).auth() ;