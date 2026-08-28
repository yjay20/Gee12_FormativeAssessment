const card = document.getElementById('card');
const stateTag = document.getElementById('stateTag');

const VOTE_KEY_PREFIX = "pauseAndDecide_voted_q";
const SCORED_KEY_PREFIX = "pauseAndDecide_scored_q";
const NAME_KEY = "pauseAndDecide_name_session1";
const DEVICE_KEY = "pauseAndDecide_deviceId";
const RESET_KEY = "pauseAndDecide_lastReset";
const ANSWER_SECONDS = 30;

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
const STUDENT_DOC = db.collection("pauseAndDecideStudents").doc(deviceId);

let studentName = localStorage.getItem(NAME_KEY) || "";
let checkedIn = !!studentName;

let currentIndex = 0;
let revealed = false;
let sessionLoaded = false;
let questionStartedAt = null;
let timeUpInterval = null;

// Network check state
let lastNetworkCheck = null;
let firstSnapshotSeen = false;

let started = false; // add alongside the other `let` declarations near the top

// ---------- Deterministic per-device option scrambling ----------
// Each student sees a stable (but different) order for a given
// question's options. The underlying `letter` on each option is its
// ORIGINAL letter and is what voting/correctness checks use — it never
// changes. `displayLetter` is a fresh A, B, C, D assigned in the new,
// shuffled order, purely for what's shown on screen, so students always
// see a clean A-D sequence regardless of how the options were shuffled.
function hashStr(str){
  let h = 0;
  for (let i = 0; i < str.length; i++){
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

function seededRandom(seed){
  let t = seed;
  return function(){
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Deterministically picks one wording per option for this student. Uses a
// seed independent of the shuffle order (keyed by option letter, not
// position) so which wording a student sees doesn't correlate with where
// the option lands on screen. If an option has no `variants`, falls back
// to its canonical `text` unchanged.
function pickVariantText(q, index, option){
  if (!option.variants || option.variants.length === 0) return option.text;
  const rand = seededRandom(hashStr(deviceId + ':' + index + ':text:' + option.letter));
  const i = Math.floor(rand() * option.variants.length);
  return option.variants[i];
}

function getScrambledOptions(q, index){
  const rand = seededRandom(hashStr(deviceId + ':' + index));
  const arr = [...q.options];
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.map((o, i) => ({
    ...o,
    text: pickVariantText(q, index, o), // student-facing wording (may differ per device)
    displayLetter: String.fromCharCode(65 + i) // A, B, C, D in the new order
  }));
}

// Make sure the session doc exists.
SESSION_DOC.get().then(doc => {
  if (!doc.exists) {
    const votes = {};
    questions.forEach((q, i) => {
      votes[i] = {};
      q.options.forEach(o => votes[i][o.letter] = 0);
    });
    SESSION_DOC.set({
      currentIndex: 0,
      revealed: false,
      finished: false,
      votes,
      questionStartedAt: Date.now().toString()
    });
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
  if (checkedIn) {
    ensureStudentRecord();
    renderCurrentState();
  } else {
    renderCheckIn();
  }
}

// Make sure a scoreboard entry exists for this student.
function ensureStudentRecord(){
  STUDENT_DOC.set({
    name: studentName,
    updatedAt: Date.now()
  }, { merge: true }).catch(err => console.error("Could not create student record:", err));
}

// ---------- STEP 1: Name check-in ----------

function renderCheckIn(){
  document.getElementById('lawLabel').textContent = "Pause & Decide";
  stateTag.textContent = "Check-In";
  card.innerHTML = `
    <div class="kicker">Pause & Decide</div>
    <h1 class="headline"><span class="glyph">🪪</span>Quick Check-In</h1>
    <div class="divider"></div>
    <div class="situation-label">Before we start</div>
    <div class="situation-text" style="font-size:16px;">
      Type your real name to join the session. This name is locked to this device for the whole session.
    </div>

    <label class="field-label" for="nameInput">Your full name</label>
    <input type="text" id="nameInput" class="text-input" placeholder="e.g. Ana Dela Cruz" autocomplete="off" />

    <div class="waiting-note" id="checkInNote">Enter your name, then tap "Join Session."</div>

    <div class="actions">
      <span></span>
      <button class="primary" id="confirmBtn" disabled>Join Session</button>
    </div>
  `;

  const nameInput = document.getElementById('nameInput');
  const confirmBtn = document.getElementById('confirmBtn');

  nameInput.addEventListener('input', () => {
    confirmBtn.disabled = nameInput.value.trim().length < 2;
  });

  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !confirmBtn.disabled) confirmBtn.click();
  });

  confirmBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name.length < 2) return;
    finishCheckIn(name);
  });
}

function finishCheckIn(name){
  studentName = name;
  checkedIn = true;
  localStorage.setItem(NAME_KEY, name);

  DEVICE_DOC.set({ name: name, lockedAt: Date.now() }, { merge: true })
    .catch(err => console.error("Could not lock name:", err));

  ensureStudentRecord();
  renderCurrentState();
}

// ---------- STEP 2: Voting (per current question) ----------

function voteKey(index){ return VOTE_KEY_PREFIX + index; }
function scoredKey(index){ return SCORED_KEY_PREFIX + index; }

function getRemainingSeconds(){
  if (!questionStartedAt) return ANSWER_SECONDS;
  const elapsed = (Date.now() - Number(questionStartedAt)) / 1000;
  return Math.max(0, Math.ceil(ANSWER_SECONDS - elapsed));
}

function stopTimeUpWatch(){
  if (timeUpInterval) {
    clearInterval(timeUpInterval);
    timeUpInterval = null;
  }
}

function renderCurrentState(){
  stopTimeUpWatch();

  if (!sessionLoaded) {
    stateTag.textContent = "Loading";
    card.innerHTML = `<div class="waiting-note">Waiting for the presenter to start…</div>`;
    return;
  }

  if (!started) {
    stateTag.textContent = "Waiting";
    card.innerHTML = `
      <div class="waiting-note">You're checked in, ${studentName}. Waiting for the presenter to start the assessment…</div>
    `;
    return;
  }

  if (finishedSession) {
    stateTag.textContent = "Session Complete";
    card.innerHTML = `
      <div class="reveal-box">
        <div class="reveal-check">🎉</div>
        <div class="reveal-law">Session Complete</div>
        <div class="reveal-explain">Thanks for participating, ${studentName}! Your presenter will reveal the class scoreboard shortly.</div>
      </div>
    `;
    return;
  }

  const q = questions[currentIndex];
  document.getElementById('lawLabel').textContent = q.law;

  if (revealed) {
    scoreCurrentQuestionIfNeeded(q);
    renderReveal(q);
    return;
  }

  const hasVoted = !!localStorage.getItem(voteKey(currentIndex));
  const remaining = getRemainingSeconds();
  const timeUp = remaining <= 0;
  const locked = hasVoted || timeUp;
  const displayOptions = getScrambledOptions(q, currentIndex);

  stateTag.textContent = hasVoted
    ? "Submitted"
    : timeUp
      ? "Time's up"
      : `Question ${currentIndex + 1} of ${questions.length}`;

  card.innerHTML = `
    <div class="kicker">${q.eyebrow} · ${studentName}</div>
    <h1 class="headline"><span class="glyph">⚖️</span>Pause &amp; Decide</h1>
    <div class="divider"></div>
    ${!hasVoted ? `
      <div class="timer-row ${timeUp ? 'time-up' : ''}" id="timerRow">
        ⏱ <span id="timerVal">${remaining}</span>s to answer
      </div>
    ` : ''}
    <div class="situation-label">Situation</div>
    <div class="situation-text">${q.situation}</div>
    <div class="question-text">${q.prompt}</div>
    <div class="options" id="optionsWrap">
      ${displayOptions.map(o => `
        <button class="option" data-letter="${o.letter}" ${locked ? "disabled" : ""}>
          <span class="letter">${o.displayLetter}.</span><span>${o.text}</span>
        </button>
      `).join('')}
    </div>
    ${hasVoted
      ? `<div class="waiting-note">Answer submitted. Waiting for the presenter…</div>`
      : timeUp
        ? `<div class="waiting-note">Time's up — you didn't submit an answer in time.</div>`
        : `<div class="waiting-note">Choose an option to submit your answer.</div>`}
  `;

  if (!hasVoted && !timeUp) {
    document.querySelectorAll('.option').forEach(btn => {
      btn.addEventListener('click', () => submitVote(btn.dataset.letter));
    });

    // Tick the on-screen timer and lock the question automatically at 0.
    timeUpInterval = setInterval(() => {
      const r = getRemainingSeconds();
      const timerVal = document.getElementById('timerVal');
      const timerRow = document.getElementById('timerRow');
      if (timerVal) timerVal.textContent = r;
      if (timerRow && r <= 0) timerRow.classList.add('time-up');

      if (r <= 0) {
        stopTimeUpWatch();
        renderCurrentState(); // re-render locked/time's-up state
      }
    }, 500);
  } else if (hasVoted) {
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

// Award a point (once) if this student answered the current question
// correctly. Guarded by a localStorage flag so re-renders / rejoining
// the page never double-count the same question.
function scoreCurrentQuestionIfNeeded(q){
  if (localStorage.getItem(scoredKey(currentIndex))) return;

  const selected = localStorage.getItem(voteKey(currentIndex));
  localStorage.setItem(scoredKey(currentIndex), "1");

  const isCorrect = selected && selected === q.correctLetter;

  STUDENT_DOC.set({
    name: studentName,
    updatedAt: Date.now(),
    ...(isCorrect ? { score: firebase.firestore.FieldValue.increment(1) } : {}),
    [`answers.${currentIndex}`]: selected || null
  }, { merge: true }).catch(err => console.error("Could not save score:", err));
}

function renderReveal(q){
  stopTimeUpWatch();
  stateTag.textContent = "Answer";
  const hasVoted = !!localStorage.getItem(voteKey(currentIndex));
  const selected = localStorage.getItem(voteKey(currentIndex));
  const gotItRight = selected && selected === q.correctLetter;
  const displayOptions = getScrambledOptions(q, currentIndex);
  const correctDisplayLetter = displayOptions.find(o => o.letter === q.correctLetter)?.displayLetter || q.correctLetter;

  card.innerHTML = `
    <div class="options" id="optionsWrap">
      ${displayOptions.map(o => {
        const isCorrect = o.letter === q.correctLetter;
        const isYourPick = o.letter === selected;
        const cls = [
          "option", "revealed",
          isCorrect ? "is-correct" : "",
          (isYourPick && !isCorrect) ? "is-wrong" : ""
        ].filter(Boolean).join(" ");
        return `
          <button class="${cls}" disabled>
            <span class="letter">${o.displayLetter}.</span><span>${o.text}</span>
            ${isCorrect ? '<span class="tag-inline">✅ Correct</span>' : ''}
            ${(isYourPick && !isCorrect) ? '<span class="tag-inline">Your answer</span>' : ''}
          </button>
        `;
      }).join('')}
    </div>
    <div class="reveal-box">
      <div class="reveal-check">${hasVoted ? (gotItRight ? "✅" : "❌") : "⏱"}</div>
      <div class="reveal-law">Correct Answer: ${correctDisplayLetter} — ${q.correctLabel}</div>
      <div class="reveal-explain">${q.explain}</div>
      <div class="takeaway"><b>Key takeaway:</b> ${q.takeaway}</div>
      <div class="waiting-note" style="margin-top:16px;">Waiting for the presenter to move to the next question…</div>
    </div>
  `;
}

// ---------- Network check (toast) ----------

function showToast(message, tone = "ok"){
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${tone}`;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toast.className = "toast"; }, 3500);
}

function handleNetworkCheck(sentAtStr){
  const sentAt = Number(sentAtStr);
  const latency = Date.now() - sentAt;

  // Rough, informal read — client clocks aren't perfectly synced,
  // this is just meant to catch obviously bad connections.
  if (latency < 800) {
    showToast(`Connection looks good (${latency}ms)`, "ok");
  } else if (latency < 2500) {
    showToast(`Connection a bit slow (${latency}ms)`, "warn");
  } else {
    showToast(`Weak connection detected (${latency}ms) — try reconnecting to wifi`, "bad");
  }
}

// ---------- Boot + live sync ----------

let finishedSession = false;

boot();

SESSION_DOC.onSnapshot(doc => {
  if (!doc.exists) return;
  const data = doc.data();
  sessionLoaded = true;
  started = !!data.started;

  // --- network check ---
  if (!firstSnapshotSeen) {
    firstSnapshotSeen = true;
    lastNetworkCheck = data.networkCheckAt || null; // baseline, don't toast on load
  } else if (data.networkCheckAt && data.networkCheckAt !== lastNetworkCheck) {
    lastNetworkCheck = data.networkCheckAt;
    handleNetworkCheck(data.networkCheckAt);
  }

  const lastReset = localStorage.getItem(RESET_KEY);
  if (data.resetAt && data.resetAt !== lastReset) {
    localStorage.setItem(RESET_KEY, data.resetAt);
    questions.forEach((_, i) => {
      localStorage.removeItem(voteKey(i));
      localStorage.removeItem(scoredKey(i));
    });
    finishedSession = false;
  }

  currentIndex = data.currentIndex || 0;
  revealed = !!data.revealed;
  finishedSession = !!data.finished;
  questionStartedAt = data.questionStartedAt || null;

  if (checkedIn) renderCurrentState();
});
