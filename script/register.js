import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

// Function to create spinner
function createSpinner(button) {
  const spinner = document.createElement('span');
  spinner.classList.add('spinner-border', 'spinner-border-sm', 'ms-1');
  button.appendChild(spinner);
  return spinner;
}

// Function to remove spinner
function removeSpinner(spinner) {
  spinner.remove();
}

// Function to check if email is valid
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Event listener for sign up button
const submit = document.getElementById("signup");
submit.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm_password").value;
  const button = event.target; // Get the button that was clicked

  if (!isValidEmail(email)) {
    alert("Enter a valid email address");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  if (email === "" || password === "") {
    alert("Fill All input fields");
    return;
  }

  if (password !== confirm) {
    alert("Passwords must match");
    return;
  }

  const spinner = createSpinner(button); // Start spinner animation

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    })
    .finally(() => {
      removeSpinner(spinner); // Remove spinner regardless of success or failure
    });
});
