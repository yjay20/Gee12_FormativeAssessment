const ADMIN_PASSWORD = "adminweek2-4";
const ADMIN_SESSION_KEY = "pauseAndDecide_adminAuthed";

const loginStage = document.getElementById('loginStage');
const adminStage = document.getElementById('adminStage');
const passwordInput = document.getElementById('adminPasswordInput');
const loginBtn = document.getElementById('loginBtn');
const loginNote = document.getElementById('loginNote');

function unlockAdmin(){
  sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
  loginStage.style.display = "none";
  adminStage.style.display = "block";

  // Only now do we load admin.js, so no Firestore reads/renders happen
  // for an unauthenticated visitor.
  const script = document.createElement('script');
  script.src = "admin.js";
  document.body.appendChild(script);
}

function attemptLogin(){
  const value = passwordInput.value;
  if (value === ADMIN_PASSWORD) {
    unlockAdmin();
  } else {
    loginNote.textContent = "Incorrect password. Try again.";
    passwordInput.value = "";
    passwordInput.focus();
  }
}

loginBtn.addEventListener('click', attemptLogin);
passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') attemptLogin();
});

// Skip the prompt if this tab already logged in this session
// (closing the browser/tab clears it — sessionStorage, not localStorage).
if (sessionStorage.getItem(ADMIN_SESSION_KEY) === "1") {
  unlockAdmin();
} else {
  passwordInput.focus();
}
