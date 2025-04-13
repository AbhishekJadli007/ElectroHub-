// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } 
    from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } 
    from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0BtBurYBLn74pTdZyCmEXY8GOxAodCy4",
    authDomain: "fourth-sem-web-1268.firebaseapp.com",
    projectId: "fourth-sem-web-1268",
    storageBucket: "fourth-sem-web-1268.firebasestorage.app",
    messagingSenderId: "306227043140",
    appId: "1:306227043140:web:ac697e2475f5535692d511",
    measurementId: "G-QNG0M5095J"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to show messages
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(function() {
        messageDiv.style.opacity = 0;
        setTimeout(() => {
            messageDiv.style.display = "none"; // Hides message completely after fade-out
        }, 500);
    }, 5000);
}

// ✅ Function to update UI after login
function updateLoginButton(userName) {
    const loginButton = document.getElementById("signInButton");
    const userContainer = document.getElementById("userContainer");

    if (userName) {
        if (loginButton) {
            loginButton.style.display = "none"; // Hide login button
        }

        userContainer.innerHTML = `
            <span id="userName" style="font-weight: bold;">${userName}</span>
            <button id="logoutButton" style="margin-left: 10px; padding: 5px 10px; cursor: pointer;">Logout</button>
        `;

        // Logout functionality
        document.getElementById("logoutButton").addEventListener("click", () => {
            signOut(auth)
                .then(() => {
                    window.location.reload(); // Reload page after logout
                })
                .catch((error) => {
                    console.error("Logout Error:", error);
                });
        });
    }
}

// ✅ Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Fetch user details from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            updateLoginButton(userDoc.data().firstName);
        } else {
            updateLoginButton("User"); // Fallback name
        }
    }
});


// EXPORT FUNCTION
export function checkAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            callback(true, user); // User is logged in
        } else {
            callback(false, null); // User is not logged in
        }
    });
}

// ✅ Signup Event Listener
const signUpButton = document.getElementById("submitSignUp");
signUpButton.addEventListener("click", (event) => {
    event.preventDefault();

    const firstname = document.getElementById("fName").value.trim();
    const lastname = document.getElementById("lName").value.trim();
    const email = document.getElementById("rEmail").value.trim();
    const password = document.getElementById("rPassword").value.trim();

    if (firstname === "" || lastname === "" || email === "" || password === "") {
        showMessage("All fields are required!", "signUpMessage");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstname,
                lastName: lastname
            };

            showMessage("Account created successfully!", "signUpMessage");

            return setDoc(doc(db, "users", user.uid), userData);
        })
        .then(() => {
            window.location.href = "login2.html"; // Redirect to home page
        })
        .catch((error) => {
            let errorMessage = "Unable to create User";

            if (error.code === "auth/email-already-in-use") {
                errorMessage = "Email Address Already Exists!";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "Password should be at least 6 characters!";
            }

            showMessage(errorMessage, "signUpMessage");
        });
});

// ✅ Login Event Listener with Redirection
const signInButton = document.getElementById("submitSignIn");

signInButton.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        showMessage("All fields are required!", "signInMessage");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage("Login Successful! Redirecting...", "signInMessage");

            setTimeout(() => {
                window.location.href = "projectwebd_home.html"; // Redirect to home page
            }, 2000);
        })
        .catch((error) => {
            let errorMessage = "Login failed!";

            if (error.code === "auth/user-not-found") {
                errorMessage = "User not found!";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password!";
            }

            showMessage(errorMessage, "signInMessage");
        });
}

);




export { getAuth , signOut};


/* <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script> */