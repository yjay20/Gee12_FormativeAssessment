const card = document.getElementById('card');
const stateTag = document.getElementById('stateTag');

const ANSWER_SECONDS = 30;

let currentIndex = 0;
let revealed = false;
let finished = false;
let scoresRevealed = false;
let started = false;
let currentVotes = {};
let questionStartedAt = null;
let countdownInterval = null;

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
      started: false,
      revealed: false,
      finished: false,
      scoresRevealed: false,
      votes,
      questionStartedAt: null
    });
  }
});

function getRemainingSeconds(){
  if (!questionStartedAt) return ANSWER_SECONDS;
  const elapsed = (Date.now() - Number(questionStartedAt)) / 1000;
  return Math.max(0, Math.ceil(ANSWER_SECONDS - elapsed));
}

function stopCountdown(){
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

function startCountdown(){
  stopCountdown();
  updateCountdownDisplay();
  countdownInterval = setInterval(() => {
    const remaining = getRemainingSeconds();
    updateCountdownDisplay();
    if (remaining <= 0) stopCountdown();
  }, 500);
}

function updateCountdownDisplay(){
  const el = document.getElementById('countdownVal');
  if (!el) return;
  const remaining = getRemainingSeconds();
  el.textContent = remaining;
  el.parentElement.classList.toggle('time-up', remaining <= 0);

  const revealBtn = document.getElementById('revealBtn');
  if (revealBtn) {
    const total = Object.values(currentVotes).reduce((a, b) => a + b, 0);
    revealBtn.disabled = total === 0 && remaining > 0;
  }
}

// Shown after a successful presenter login, before the presenter has
// tapped "Start Assessment." No timer runs and no question is shown yet.
function renderPreStart(){
  stopCountdown();
  document.getElementById('lawLabel').textContent = "Pause & Decide";
  stateTag.textContent = "Ready";

  card.innerHTML = `
    <div class="reveal-box">
      <div class="reveal-check">🎬</div>
      <div class="reveal-law">Ready to Begin</div>
      <div class="reveal-explain">${questions.length} question${questions.length === 1 ? "" : "s"} loaded. Students can check in now, but the timer won't start until you tap below.</div>
    </div>
    <div class="divider"></div>
    <div class="actions">
      <span></span>
      <button class="primary" id="startBtn">Start Assessment</button>
    </div>
  `;

  document.getElementById('startBtn').addEventListener('click', () => {
    SESSION_DOC.update({
      started: true,
      questionStartedAt: Date.now().toString()
    });
  });
}

function renderBars(){
  const q = questions[currentIndex];
  document.getElementById('lawLabel').textContent = q.law;
  stateTag.textContent = `Live · Question ${currentIndex + 1} of ${questions.length}`;

  const total = Object.values(currentVotes).reduce((a, b) => a + b, 0);
  const remaining = getRemainingSeconds();

  card.innerHTML = `
    <div class="tally-title">Class Response — Question ${currentIndex + 1} of ${questions.length}</div>
    <div class="countdown-badge ${remaining <= 0 ? 'time-up' : ''}">
      <span id="countdownVal">${remaining}</span><span class="countdown-label">sec left</span>
    </div>
    <div class="situation-text" style="font-size:15px; margin-bottom:18px;">${q.situation}</div>
    <div id="barsWrap">
      ${q.options.map(o => renderBarRow(o, total)).join('')}
    </div>
    <div class="majority-line">${majorityText(total, q)}</div>
    <div class="total-line">${total} response${total === 1 ? "" : "s"} so far</div>
    <div class="divider"></div>
    <div class="actions">
      <button class="ghost" id="resetBtn">Reset entire session</button>
      <button class="primary" id="revealBtn" ${total === 0 && remaining > 0 ? "disabled" : ""}>Reveal Answer</button>
    </div>
  `;

  document.getElementById('revealBtn').addEventListener('click', () => {
    stopCountdown();
    SESSION_DOC.update({ revealed: true });
  });

  document.getElementById('resetBtn').addEventListener('click', resetSession);

  startCountdown();
}

// `option` is the full { letter, text } object — voting/correctness still
// keys off the original `letter`, but what's shown on the bar itself is
// the option's actual text, not a bare A/B/C/D (students see a shuffled,
// relabeled A-D on their own screens, so the letter alone isn't useful here).
function renderBarRow(option, total){
  const count = currentVotes[option.letter] || 0;
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const q = questions[currentIndex];
  const isCorrect = option.letter === q.correctLetter;
  return `
    <div class="bar-row-text">
      <div class="bar-row-label ${isCorrect && revealed ? 'is-correct' : ''}">${option.text}</div>
      <div class="bar-row-track-line">
        <div class="bar-track"><div class="bar-fill ${isCorrect && revealed ? 'is-correct' : ''}" style="width:${pct}%"></div></div>
        <div class="bar-pct">${pct}% (${count})</div>
      </div>
    </div>
  `;
}

function majorityText(total, q){
  if (total === 0) return "Waiting for the class to respond…";
  let top = q.options[0], max = -1;
  q.options.forEach(o => {
    if ((currentVotes[o.letter] || 0) > max) { max = currentVotes[o.letter] || 0; top = o; }
  });
  const pct = Math.round(((currentVotes[top.letter] || 0) / total) * 100);
  return `${pct}% chose "${top.text}"`;
}

function renderReveal(){
  stopCountdown();
  const q = questions[currentIndex];
  document.getElementById('lawLabel').textContent = q.law;
  stateTag.textContent = `Answer · Question ${currentIndex + 1} of ${questions.length}`;

  const total = Object.values(currentVotes).reduce((a, b) => a + b, 0);
  const isLast = currentIndex === questions.length - 1;

  card.innerHTML = `
    <div class="tally-title">Class Response — Question ${currentIndex + 1} of ${questions.length}</div>
    <div id="barsWrap">
      ${q.options.map(o => renderBarRow(o, total)).join('')}
    </div>
    <div class="majority-line">${majorityText(total, q)}</div>
    <div class="divider"></div>
    <div class="reveal-box">
      <div class="reveal-check">✅</div>
      <div class="reveal-law">Correct Answer: ${q.correctLabel}</div>
      <div class="reveal-explain">${q.explain}</div>
      <div class="takeaway"><b>Key takeaway:</b> ${q.takeaway}</div>
    </div>
    <div class="divider"></div>
    <div class="actions">
      <button class="ghost" id="resetBtn">Reset entire session</button>
      ${isLast
        ? `<button class="primary" id="finishBtn">Finish (last question)</button>`
        : `<button class="primary" id="nextBtn">Next Question →</button>`}
    </div>
  `;

  document.getElementById('resetBtn').addEventListener('click', resetSession);

  if (!isLast) {
    document.getElementById('nextBtn').addEventListener('click', () => {
      SESSION_DOC.update({
        currentIndex: currentIndex + 1,
        revealed: false,
        questionStartedAt: Date.now().toString()
      });
    });
  } else {
    document.getElementById('finishBtn').addEventListener('click', () => {
      SESSION_DOC.update({ finished: true });
    });
  }
}

// Screen shown once the last question has been revealed and the
// presenter has clicked Finish. Gives a one-tap way to reveal the
// class scoreboard, and re-renders as the leaderboard once revealed.
function renderFinished(){
  stopCountdown();
  stateTag.textContent = "Session Complete";
  document.getElementById('lawLabel').textContent = "Pause & Decide";

  if (scoresRevealed) {
    renderLeaderboard();
    return;
  }

  card.innerHTML = `
    <div class="reveal-box">
      <div class="reveal-check">🏁</div>
      <div class="reveal-law">All ${questions.length} Questions Complete</div>
      <div class="reveal-explain">Students are waiting. Tap below to reveal the class scoreboard.</div>
    </div>
    <div class="divider"></div>
    <div class="actions">
      <button class="ghost" id="resetBtn">Reset entire session</button>
      <button class="primary" id="revealScoresBtn">Reveal Scores</button>
    </div>
  `;

  document.getElementById('resetBtn').addEventListener('click', resetSession);
  document.getElementById('revealScoresBtn').addEventListener('click', () => {
    SESSION_DOC.update({ scoresRevealed: true });
  });
}

async function renderLeaderboard(){
  stateTag.textContent = "Scoreboard";
  card.innerHTML = `
    <div class="tally-title">Class Scoreboard</div>
    <div class="waiting-note">Loading scores…</div>
  `;

  let students = [];
  try {
    const snap = await db.collection("pauseAndDecideStudents").orderBy("score", "desc").get();
    students = snap.docs.map(d => d.data());
  } catch (err) {
    // orderBy fails if some students have no score field yet (never
    // answered correctly) — fall back to an unordered fetch and sort locally.
    console.error("Ordered score fetch failed, falling back:", err);
    const snap = await db.collection("pauseAndDecideStudents").get();
    students = snap.docs.map(d => d.data());
    students.sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  const rows = students.map((s, i) => `
    <div class="bar-row" style="grid-template-columns: 28px 1fr 60px;">
      <div class="letter">${i + 1}</div>
      <div style="font-weight:600;">${s.name || "Unnamed"}</div>
      <div class="bar-pct">${s.score || 0} / ${questions.length}</div>
    </div>
  `).join('');

  card.innerHTML = `
    <div class="tally-title">Class Scoreboard</div>
    <div id="barsWrap">
      ${rows || `<div class="waiting-note">No students checked in.</div>`}
    </div>
    <div class="divider"></div>
    <div class="actions">
      <button class="ghost" id="resetBtn">Reset entire session</button>
      <span></span>
    </div>
  `;

  document.getElementById('resetBtn').addEventListener('click', resetSession);
}

function resetSession(){
  stopCountdown();
  const votes = {};
  questions.forEach((q, i) => {
    votes[i] = {};
    q.options.forEach(o => votes[i][o.letter] = 0);
  });
  SESSION_DOC.set({
    currentIndex: 0,
    started: false,
    revealed: false,
    finished: false,
    scoresRevealed: false,
    votes,
    resetAt: Date.now().toString(),
    questionStartedAt: null
  });

  // Clear the scoreboard too, so a new session starts fresh.
  db.collection("pauseAndDecideStudents").get().then(snap => {
    snap.forEach(doc => doc.ref.delete().catch(() => {}));
  }).catch(err => console.error("Could not clear scoreboard:", err));
}

// ---------- Network check ----------

document.getElementById('networkCheckBtn').addEventListener('click', () => {
  const btn = document.getElementById('networkCheckBtn');
  const status = document.getElementById('networkCheckStatus');

  btn.disabled = true;
  status.textContent = "Pinging class…";

  SESSION_DOC.update({ networkCheckAt: Date.now().toString() })
    .then(() => {
      status.textContent = "Sent ✓";
      setTimeout(() => { status.textContent = ""; btn.disabled = false; }, 2000);
    })
    .catch(err => {
      console.error("Network check failed:", err);
      status.textContent = "Failed to send";
      btn.disabled = false;
    });
});

// ---------- Live sync ----------

SESSION_DOC.onSnapshot(doc => {
  if (!doc.exists) return;
  const data = doc.data();
  currentIndex = data.currentIndex || 0;
  started = !!data.started;
  revealed = !!data.revealed;
  finished = !!data.finished;
  scoresRevealed = !!data.scoresRevealed;
  currentVotes = (data.votes && data.votes[currentIndex]) || {};
  questionStartedAt = data.questionStartedAt || null;

  if (finished) {
    renderFinished();
  } else if (!started) {
    renderPreStart();
  } else if (revealed) {
    renderReveal();
  } else {
    renderBars();
  }
});
