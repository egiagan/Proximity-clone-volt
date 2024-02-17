import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, sendEmailVerification, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9s5b2-OQA4wY3AwMFRt6qNOz-RYyth34",
  authDomain: "login-example-dff35.firebaseapp.com",
  projectId: "login-example-dff35",
  storageBucket: "login-example-dff35.appspot.com",
  messagingSenderId: "745268124885",
  appId: "1:745268124885:web:8529e4339ca902e7ec565c"
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
    window.location.href = "login.html";
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
