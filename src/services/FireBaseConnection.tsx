

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBPbu9bTT9P1V5HUhsELRfKBTtDi2AVaIM",
  authDomain: "projeto-links-a6f8d.firebaseapp.com",
  projectId: "projeto-links-a6f8d",
  storageBucket: "projeto-links-a6f8d.appspot.com",
  messagingSenderId: "258395117992",
  appId: "1:258395117992:web:5214f20f3cb851f494259d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};