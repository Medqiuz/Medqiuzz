import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

let currentProfile = null;
let firstAuthReady;
window.authReady = new Promise((resolve) => { firstAuthReady = resolve; });

window.authSystem = {
  isAuthenticated() {
    return Boolean(auth.currentUser && currentProfile);
  },
  getCurrentUser() {
    return currentProfile;
  },
  async login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
    const profileSnapshot = await getDoc(doc(db, "students", credential.user.uid));
    if (!profileSnapshot.exists()) {
      throw new Error("This account has no completed MedQuiz student registration.");
    }
    currentProfile = profileSnapshot.data();
    window.dispatchEvent(new Event("medquiz-auth-ready"));
    return currentProfile;
  },
  async logout() {
    await signOut(auth);
    currentProfile = null;
    localStorage.removeItem("medquiz_user");
    localStorage.removeItem("medquiz_session_time");
    localStorage.removeItem("dashboard_user");
    localStorage.removeItem("dashboard_session_time");
    window.location.href = "index.html";
  }
};

onAuthStateChanged(auth, async (user) => {
  currentProfile = null;
  if (user) {
    try {
      const profileSnapshot = await getDoc(doc(db, "students", user.uid));
      if (profileSnapshot.exists()) currentProfile = profileSnapshot.data();
    } catch (error) {
      console.error("Could not load student profile:", error);
    }
  }
  firstAuthReady({ user, profile: currentProfile });
  firstAuthReady = () => {};
  window.dispatchEvent(new Event("medquiz-auth-ready"));
});
