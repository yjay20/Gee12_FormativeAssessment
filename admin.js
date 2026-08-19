const card = document.getElementById('card');
const stateTag = document.getElementById('stateTag');

let currentIndex = 0;
let revealed = false;
let currentVotes = {};

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

function renderBars(){
  const q = questions[currentIndex];
  document.getElementById('lawLabel').textContent = q.law;
  stateTag.textContent = `Live · Question ${currentIndex + 1} of ${questions.length}`;

  const total = Object.values(currentVotes).reduce((a, b) => a + b, 0);
  const isLast = currentIndex === questions.length - 1;

  card.innerHTML = `
    <div class="tally-title">Class Response — Question ${currentIndex + 1} of ${questions.length}</div>
    <div class="situation-text" style="font-size:15px; margin-bottom:18px;">${q.situation}</div>
    <div id="barsWrap">
      ${q.options.map(o => renderBarRow(o.letter, total)).join('')}
    </div>
    <div class="majority-line">${majorityText(total, q)}</div>
    <div class="total-line">${total} response${total === 1 ? "" : "s"} so far</div>
    <div class="divider"></div>
    <div class="actions">
      <button class="ghost" id="resetBtn">Reset entire session</button>
      <button class="primary" id="revealBtn" ${total === 0 ? "disabled" : ""}>Reveal Answer</button>
    </div>
  `;

  document.getElementById('revealBtn').addEventListener('click', () => {
    SESSION_DOC.update({ revealed: true });
  });

  document.getElementById('resetBtn').addEventListener('click', resetSession);
}

function renderBarRow(letter, total){
  const count = currentVotes[letter] || 0;
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const q = questions[currentIndex];
  const isCorrect = letter === q.correctLetter;
  return `
    <div class="bar-row">
      <div class="letter">${letter}</div>
      <div class="bar-track"><div class="bar-fill ${isCorrect && revealed ? 'is-correct' : ''}" style="width:${pct}%"></div></div>
      <div class="bar-pct">${pct}% (${count})</div>
    </div>
  `;
}

function majorityText(total, q){
  if (total === 0) return "Waiting for the class to respond…";
  let top = q.options[0].letter, max = -1;
  q.options.forEach(o => {
    if ((currentVotes[o.letter] || 0) > max) { max = currentVotes[o.letter] || 0; top = o.letter; }
  });
  const pct = Math.round(((currentVotes[top] || 0) / total) * 100);
  return `${pct}% chose ${top}`;
}

function renderReveal(){
  const q = questions[currentIndex];
  document.getElementById('lawLabel').textContent = q.law;
  stateTag.textContent = `Answer · Question ${currentIndex + 1} of ${questions.length}`;

  const total = Object.values(currentVotes).reduce((a, b) => a + b, 0);
  const isLast = currentIndex === questions.length - 1;

  card.innerHTML = `
    <div class="tally-title">Class Response — Question ${currentIndex + 1} of ${questions.length}</div>
    <div id="barsWrap">
      ${q.options.map(o => renderBarRow(o.letter, total)).join('')}
    </div>
    <div class="majority-line">${majorityText(total, q)}</div>
    <div class="divider"></div>
    <div class="reveal-box">
      <div class="reveal-check">✅</div>
      <div class="reveal-law">${q.correctLabel}</div>
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
        revealed: false
      });
    });
  } else {
    document.getElementById('finishBtn').addEventListener('click', () => {
      // No further action needed — this just confirms the deck is complete.
      document.getElementById('finishBtn').textContent = "All 10 questions complete ✓";
      document.getElementById('finishBtn').disabled = true;
    });
  }
}

function resetSession(){
  const votes = {};
  questions.forEach((q, i) => {
    votes[i] = {};
    q.options.forEach(o => votes[i][o.letter] = 0);
  });
  SESSION_DOC.set({
    currentIndex: 0,
    revealed: false,
    votes,
    resetAt: Date.now().toString()
  });
}

SESSION_DOC.onSnapshot(doc => {
  if (!doc.exists) return;
  const data = doc.data();
  currentIndex = data.currentIndex || 0;
  revealed = !!data.revealed;
  currentVotes = (data.votes && data.votes[currentIndex]) || {};

  revealed ? renderReveal() : renderBars();
});