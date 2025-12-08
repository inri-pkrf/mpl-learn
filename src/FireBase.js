// FireBase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Config שלך
const firebaseConfig = {
  apiKey: "AIzaSyCthOepxOE4ItHh6a4vdLCyAiSSd4WVSTs",
  authDomain: "mpl-learn.firebaseapp.com",
  projectId: "mpl-learn",
  storageBucket: "mpl-learn.appspot.com",
  messagingSenderId: "1004194182158",
  appId: "1:1004194182158:web:e34feccb861652e756f85f",
  measurementId: "G-K3FLPFB5NY"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
