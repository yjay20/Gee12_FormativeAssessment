const firebaseConfig = {
  apiKey: "AIzaSyBZDGfsJ8P2VLHtugiYM4y_w-LdoxkbUwc",
  authDomain: "formativeassement.firebaseapp.com",
  projectId: "formativeassement",
  storageBucket: "formativeassement.firebasestorage.app",
  messagingSenderId: "362361331688",
  appId: "1:362361331688:web:35c5c2068db11f27200e5d"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// All votes + session state live in one doc so students and the
// admin screen can both listen to it in real time.
const SESSION_DOC = db.collection("pauseAndDecide").doc("session1");