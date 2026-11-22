import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBI1CqRK_5VtjPuJVS6Q-TgVwwK1__KQSk",
  authDomain: "medqiuzz.firebaseapp.com",
  projectId: "medqiuzz",
  storageBucket: "medqiuzz.firebasestorage.app",
  messagingSenderId: "38225486280",
  appId: "1:38225486280:web:abd1bfb6e61c1b6d4be0fd",
  measurementId: "G-ESMFR1ZRFK"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
