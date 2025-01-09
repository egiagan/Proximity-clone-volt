import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Your web app's Firebase configuration
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

const database = getDatabase(app);
const storage = getStorage(app);
const itemsInDb = ref(database, "lostItems");

document.getElementById("changeProfile").addEventListener("click", function () {
  const fileInput = document.getElementById("newProfilePicture");
  const file = fileInput.files[0];

  if (file) {
    const storageRefChild = storageRef(storage, 'some-child/' + file.name);
    uploadBytes(storageRefChild, file)
      .then((snapshot) => {

        console.log('Uploaded a blob or file!');
        // Get the download URL of the uploaded file
        getDownloadURL(storageRefChild)
          .then((url) => {
            console.log('File available at', url);

            updateProfile(auth.currentUser, { photoURL: url })
              .then(() => {

                // Update the UI with the new profile picture
                const profiles = document.querySelectorAll(".profile-picture-main");
                profiles.forEach(profile => {
                  profile.src = `url(${url})`;
                });

                window.location.reload()
              })
              .catch((error) => {

                console.error('Error updating profile:', error);
                alert(error);
              });
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
            alert(error);
          });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert(error);
      });
  } else {
    console.error("No file selected");
    alert("No file selected");
  }
});


