

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
// import firebase from "firebase";
// import 'firebase/firestore';
const config = {
  apiKey: "AIzaSyAwBk-R7r-E9Y-P0E0Md9mKmMKaRdWuYvk",
  authDomain: "smart-library-8f386.firebaseapp.com",
  databaseURL: "https://smart-library-8f386-default-rtdb.firebaseio.com",
  projectId: "smart-library-8f386",
  storageBucket: "smart-library-8f386.appspot.com",
  messagingSenderId: "350217175224",
  appId: "1:350217175224:web:175967789754ad7621744d",
  measurementId: "G-NDGCPXDDR2"
};
firebase.initializeApp(config);
export default firebase;