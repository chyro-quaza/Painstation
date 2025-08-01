// 🔥 Paste your Firebase config here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 😈 Trash Talk Generator
const insults = [
  "You call that a password?",
  "I’ve seen pigeons type better.",
  "Try again, mortal.",
  "Even the database pities you.",
  "Ouch. That was pathetic."
];

// 👿 Register User
function register() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      updateStatus(`Account created. Misery begins, ${email}.`);
    })
    .catch(err => {
      updateStatus(insults[Math.floor(Math.random() * insults.length)] + ` (${err.message})`);
    });
}

// 👺 Login User
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      updateStatus(`Welcome back, ${email}. Ready to suffer more?`);
    })
    .catch(err => {
      updateStatus(insults[Math.floor(Math.random() * insults.length)] + ` (${err.message})`);
    });
}

// 😭 Save Pain Data to Firestore
function savePainData() {
  const user = auth.currentUser;
  if (!user) {
    updateStatus("You must be logged in to record your agony.");
    return;
  }

  const score = parseInt(document.getElementById("scoreInput").value);
  const fails = parseInt(document.getElementById("failInput").value);

  db.collection("painLogs").doc(user.email).set({
    score: score,
    failures: fails,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    updateStatus("Your suffering has been archived.");
  }).catch(error => {
    updateStatus("Database weeps. " + error.message);
  });
}

// ✉️ Display status
function updateStatus(msg) {
  document.getElementById("status").textContent = msg;
}
