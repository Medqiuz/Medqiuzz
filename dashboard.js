
import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("protection-overlay");
  const logoutBtn = document.getElementById("logout-btn");

  function showLogin() {
    if (overlay) overlay.style.display = "flex";
    const container = document.querySelector(".dashboard-container");
    if (container) container.style.display = "none";
  }

  function showDashboard() {
    if (overlay) overlay.style.display = "none";
    const container = document.querySelector(".dashboard-container");
    if (container) container.style.display = "";
  }

  function showError(message) {
    if (overlay) {
      overlay.style.display = "flex";
      const paragraph = overlay.querySelector(".protection-modal > p");
      if (paragraph) paragraph.textContent = message;
    }
  }

  // Always hide protected content until Firebase verifies the session.
  showLogin();

  onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      showLogin();
      return;
    }

    try {
      const studentRef = doc(db, "students", firebaseUser.uid);
      const studentSnapshot = await getDoc(studentRef);

      if (!studentSnapshot.exists()) {
        await signOut(auth);
        window.location.replace("index.html");
        return;
      }

      const user = studentSnapshot.data();

      document.getElementById("user-name").textContent =
        user.fullName || "Student";

      document.getElementById("user-department").textContent =
        user.department || "-";

      document.getElementById("user-year").textContent =
        user.year || "-";

      document.getElementById("user-university").textContent =
        user.university || "-";

      showDashboard();

    } catch (error) {
      console.error("Dashboard authentication error:", error);
      showError("Unable to verify your account. Check your internet connection and try again.");
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      logoutBtn.disabled = true;

      try {
        await signOut(auth);
        window.location.replace("index.html");
      } catch (error) {
        console.error("Logout error:", error);
        alert("Logout failed. Please try again.");
        logoutBtn.disabled = false;
      }
    });
  }
});
