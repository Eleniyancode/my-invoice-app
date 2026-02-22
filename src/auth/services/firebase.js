import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSfqnYhWZ5exmnE-mpjhLx94W6Riko6Pg",
  authDomain: "invoice-app-47997.firebaseapp.com",
  projectId: "invoice-app-47997",
  storageBucket: "invoice-app-47997.firebasestorage.app",
  messagingSenderId: "37785701645",
  appId: "1:37785701645:web:6aa67e3ec113c202503444",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
