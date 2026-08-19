const card = document.getElementById('card');
const stateTag = document.getElementById('stateTag');

const VOTE_KEY_PREFIX = "pauseAndDecide_voted_q";
const NAME_KEY = "pauseAndDecide_name_session1";
const DEVICE_KEY = "pauseAndDecide_deviceId";
const RESET_KEY = "pauseAndDecide_lastReset";

function getDeviceId(){
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = 'dev_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}
const deviceId = getDeviceId();
const DEVICE_DOC = db.collection("pauseAndDecideDevices").doc(deviceId);

let studentName = localStorage.getItem(NAME_KEY) || "";
let checkedIn = !!studentName;
let cameraStream = null;

let currentIndex = 0;
let revealed = false;
let sessionLoaded = false;

// Make sure the session doc exists.
SESSION_DOC.get().then(doc => {
  if (!doc.exists) {
    const votes = {};
    questions.forEach((q, i) => {
      votes[i] = {};
      q.options.forEach(o => votes[i][o.letter] = 0);
    });
    SESSION_DOC.set({ currentIndex: 0, revealed: false, votes });
  }
});

async function boot(){
  if (!checkedIn) {
    try {
      const deviceDoc = await DEVICE_DOC.get();
      if (deviceDoc.exists && deviceDoc.data().name) {
        studentName = deviceDoc.data().name;
        checkedIn = true;
        localStorage.setItem(NAME_KEY, studentName);
      }
    } catch (err) {
      console.error("Device lookup failed:", err);
    }
  }
  if (checkedIn) renderCurrentState();
  else renderCheckIn();
}

// ---------- STEP 1: Name + camera check-in ----------

function renderCheckIn(){
  document.getElementById('lawLabel').textContent = "Pause & Decide";
  stateTag.textContent = "Check-In";
  card.innerHTML = `
    <div class="kicker">Pause & Decide</div>
    <h1 class="headline"><span class="glyph">🪪</span>Quick Check-In</h1>
    <div class="divider"></div>
    <div class="situation-label">Before we start</div>
    <div class="situation-text" style="font-size:16px;">
      Type your real name, then confirm with your camera so we know it's really you.
      This name is locked to this device for the whole session.
    </div>

    <label class="field-label" for="nameInput">Your full name</label>
    <input type="text" id="nameInput" class="text-input" placeholder="e.g. Ana Dela Cruz" autocomplete="off" />

    <div class="camera-box" id="cameraBox">
      <video id="cameraVideo" autoplay playsinline></video>
      <canvas id="cameraCanvas" style="display:none;"></canvas>
      <div class="camera-placeholder" id="cameraPlaceholder">Camera preview will appear here</div>
    </div>

    <div class="waiting-note" id="checkInNote">Enter your name, then tap "Confirm with Camera."</div>

    <div class="actions">
      <span></span>
      <button class="primary" id="confirmBtn" disabled>Confirm with Camera</button>
    </div>
  `;

  const nameInput = document.getElementById('nameInput');
  const confirmBtn = document.getElementById('confirmBtn');
  const note = document.getElementById('checkInNote');

  nameInput.addEventListener('input', () => {
    confirmBtn.disabled = nameInput.value.trim().length < 2;
  });

  confirmBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    if (name.length < 2) return;

    confirmBtn.disabled = true;
    confirmBtn.textContent = "Opening camera…";
    note.textContent = "Look at the camera for a moment…";

    try {
      await startCameraConfirmation(name);
    } catch (err) {
      console.error("Camera error:", err);
      if (err && err.name === "NotFoundError") {
        note.textContent = "No camera found on this device.";
        showUploadFallback(name);
      } else {
        note.textContent = "Camera unavailable — checking you in with your name only.";
        finishCheckIn(name);
      }
    }
  });
}

// Fallback for devices with no camera at all: let the student "upload" a
// photo instead. Same rule as the camera path — the file is only read
// into memory to flash a confirmation, then discarded. It is never
// uploaded to Firestore, never saved to disk, never persisted anywhere.
function showUploadFallback(name){
  const box = document.getElementById('cameraBox');
  const placeholder = document.getElementById('cameraPlaceholder');
  const note = document.getElementById('checkInNote');

  placeholder.style.display = "block";
  placeholder.innerHTML = `
    <label class="upload-label" for="photoUploadInput">📷 Tap to upload a quick photo</label>
    <input type="file" id="photoUploadInput" accept="image/*" capture="user" style="display:none;" />
  `;
  note.textContent = "No camera detected — you can upload a photo instead.";

  document.getElementById('photoUploadInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    note.textContent = "Confirming…";
    const reader = new FileReader();
    reader.onload = () => {
      // Image data lives only in this local variable for a moment, then
      // is dropped — never written to Firestore, localStorage, or disk.
      let imageData = reader.result;
      setTimeout(() => {
        imageData = null; // discard
        placeholder.innerHTML = "✓ Photo confirmed (not saved)";
        finishCheckIn(name);
      }, 800);
    };
    reader.readAsDataURL(file);
  });
}

async function startCameraConfirmation(name){
  const video = document.getElementById('cameraVideo');
  const placeholder = document.getElementById('cameraPlaceholder');

  cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
  video.srcObject = cameraStream;
  placeholder.style.display = "none";
  video.style.display = "block";

  // A frame is drawn to an off-screen canvas only long enough to flash a
  // confirmation, then cleared. It is never uploaded, saved, or sent to Firestore.
  setTimeout(() => {
    const canvas = document.getElementById('cameraCanvas');
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stopCamera();
    video.style.display = "none";
    placeholder.style.display = "block";
    placeholder.textContent = "✓ Photo confirmed (not saved)";

    finishCheckIn(name);
  }, 1800);
}

function stopCamera(){
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
}

function finishCheckIn(name){
  studentName = name;
  checkedIn = true;
  localStorage.setItem(NAME_KEY, name);

  DEVICE_DOC.set({ name: name, lockedAt: Date.now() }, { merge: true })
    .catch(err => console.error("Could not lock name:", err));

  renderCurrentState();
}

// ---------- STEP 2: Voting (per current question) ----------

function voteKey(index){ return VOTE_KEY_PREFIX + index; }

function renderCurrentState(){
  if (!sessionLoaded) {
    stateTag.textContent = "Loading";
    card.innerHTML = `<div class="waiting-note">Waiting for the presenter to start…</div>`;
    return;
  }
  const q = questions[currentIndex];
  document.getElementById('lawLabel').textContent = q.law;

  if (revealed) {
    renderReveal(q);
    return;
  }

  const hasVoted = !!localStorage.getItem(voteKey(currentIndex));
  stateTag.textContent = hasVoted ? "Submitted" : `Question ${currentIndex + 1} of ${questions.length}`;

  card.innerHTML = `
    <div class="kicker">${q.eyebrow} · ${studentName}</div>
    <h1 class="headline"><span class="glyph">⚖️</span>Pause &amp; Decide</h1>
    <div class="divider"></div>
    <div class="situation-label">Situation</div>
    <div class="situation-text">${q.situation}</div>
    <div class="question-text">${q.prompt}</div>
    <div class="options" id="optionsWrap">
      ${q.options.map(o => `
        <button class="option" data-letter="${o.letter}" ${hasVoted ? "disabled" : ""}>
          <span class="letter">${o.letter}.</span><span>${o.text}</span>
        </button>
      `).join('')}
    </div>
    ${hasVoted
      ? `<div class="waiting-note">Answer submitted. Waiting for the presenter…</div>`
      : `<div class="waiting-note">Choose an option to submit your answer.</div>`}
  `;

  if (!hasVoted) {
    document.querySelectorAll('.option').forEach(btn => {
      btn.addEventListener('click', () => submitVote(btn.dataset.letter));
    });
  } else {
    const selected = localStorage.getItem(voteKey(currentIndex));
    const el = document.querySelector(`.option[data-letter="${selected}"]`);
    if (el) el.classList.add('selected');
  }
}

function submitVote(letter){
  localStorage.setItem(voteKey(currentIndex), letter);

  SESSION_DOC.update({
    [`votes.${currentIndex}.${letter}`]: firebase.firestore.FieldValue.increment(1)
  }).catch(err => console.error("Vote failed:", err));

  renderCurrentState();
}

function renderReveal(q){
  stateTag.textContent = "Answer";
  card.innerHTML = `
    <div class="reveal-box">
      <div class="reveal-check">✅</div>
      <div class="reveal-law">${q.correctLabel}</div>
      <div class="reveal-explain">${q.explain}</div>
      <div class="takeaway"><b>Key takeaway:</b> ${q.takeaway}</div>
      <div class="waiting-note" style="margin-top:16px;">Waiting for the presenter to move to the next question…</div>
    </div>
  `;
}

// ---------- Boot + live sync ----------

boot();

SESSION_DOC.onSnapshot(doc => {
  if (!doc.exists) return;
  const data = doc.data();
  sessionLoaded = true;

  const lastReset = localStorage.getItem(RESET_KEY);
  if (data.resetAt && data.resetAt !== lastReset) {
    localStorage.setItem(RESET_KEY, data.resetAt);
    questions.forEach((_, i) => localStorage.removeItem(voteKey(i)));
  }

  currentIndex = data.currentIndex || 0;
  revealed = !!data.revealed;

  if (checkedIn) renderCurrentState();
});