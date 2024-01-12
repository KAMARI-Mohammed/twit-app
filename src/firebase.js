import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJdH-w6DHAZzQ88QriY_wrsmpad-snj_A",
  authDomain: "pfat-7a26e.firebaseapp.com",
  projectId: "pfat-7a26e",
  storageBucket: "pfat-7a26e.appspot.com",
  messagingSenderId: "766431961288",
  appId: "1:766431961288:web:c639b03624d3a73f53c5fd",
  measurementId: "G-ZQCZJF3FKB"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
