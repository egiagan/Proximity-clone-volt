import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, sendEmailVerification, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { uid, displayName, email, photoURL, emailVerified } = user;

    // Get all elements with the respective classes
    const profiles = document.querySelectorAll(".profile-picture-main");
    const usernames = document.querySelectorAll(".full-name");
    const userEmails = document.querySelectorAll(".email");
    const accountEmails = document.querySelectorAll(".account-email");
    const verified = document.querySelectorAll(".verified-status");
    const userIds = document.querySelectorAll(".user-id");

    // Set profile pictures
    profiles.forEach(profile => {
      profile.src = photoURL ? photoURL : "";
    });

    // Set usernames
    usernames.forEach(username => {
      username.innerText = displayName || "User Name";
    });


    userEmails.forEach(username => {
      username.innerText = displayName || "User Name";
    });

    // Set email text
    const emailText = email || "user@email.com";

    userEmails.forEach(userEmail => {
      userEmail.innerText = emailText;
    });

    accountEmails.forEach(accountEmail => {
      accountEmail.innerText = emailText;
    });
    // Set verified status
    // Set verified status
    verified.innerHTML = emailVerified ? 'Yes <i class="fas fa-check-circle icon-success"></i>' : 'No   <i class="fa-solid fa-circle-exclamation icon-danger">  </i>';


    // Set user ID
    userIds.innerText = uid || 56413561; // Default user ID if uid is empty

  } else {
    window.location.href = "1login.html";
  }
});



const logout = document.getElementById("logout")

logout.addEventListener('click', function () {
  signOut(auth).then(() => {
    // Sign-out successful.
    window.location.href = "index.html"
  }).catch((error) => {
    // An error happened.
    alert("Error , login out")
  });
})
