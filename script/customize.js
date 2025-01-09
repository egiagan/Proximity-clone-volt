import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, updatePassword, updateEmail, updateProfile, deleteUser } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAlth1sxiP-S3r3fVDXhwadVVnEvpdO6s",
  authDomain: "login-egi-agan.firebaseapp.com",
  databaseURL: "https://login-egi-agan-default-rtdb.firebaseio.com",
  projectId: "login-egi-agan",
  storageBucket: "login-egi-agan.firebasestorage.app",
  messagingSenderId: "395059466114",
  appId: "1:395059466114:web:5c6b0621e9739df6b5c99b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
let auth;


// Listen for auth state changes
onAuthStateChanged(getAuth(app), (user) => {
  auth = getAuth(app);

  const deleteAccount = document.getElementById("deleteProfile")

 



document.getElementById("updateProfile").addEventListener("click", () => {
  const newDisplayName = document.getElementById("newDisplayName").value;
  const newPassword = document.getElementById("newPassword").value;
  const newEmail = document.getElementById("newEmail").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validate input fields
  if (!newDisplayName || !newPassword || !newEmail || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
  }

  if (newPassword.length < 6) {
      alert("Password must have at least 6 characters.");
      return;
  }

  if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
  }

  const user = auth.currentUser;

  // Update display name
  updateProfile(user, { displayName: newDisplayName })
      .then(() => {
          alert("Display name updated successfully!");
          window.location.reload();
      })
      .catch((error) => {
          alert("Error updating display name: " + error.message);
      });

  // Update password
  updatePassword(user, newPassword)
      .then(() => {
          alert("Password updated successfully!");
          window.location.reload();
      })
      .catch((error) => {
          alert("Error updating password: " + error.message);
      });

  // Update email
  if (newEmail !== user.email) {
      updateEmail(user, newEmail)
          .then(() => {
              alert("Email updated successfully! Please verify your new email address.");
              window.location.reload();
          })
          .catch((error) => {
              alert("Error updating email: " + error.message);
          });
  } else {
      alert("The new email address is the same as the current one.");
  }
});



 



});



