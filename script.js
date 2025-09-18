/*
  Simple Jeopardy implementation.
  - Categories array with clues (value, question, answer).
  - Tiles disable after clicked.
  - Modal shows clue; host can mark correct/wrong.
  - Two-team scoring with "steal" option (subtract value from other team).
  - Toggle to literally rotate value text (vertical stacked characters) and to display columns (vertical layout).
*/

const initialData = [];

let state = {
  data: JSON.parse(JSON.stringify(initialData)),
  scores: { A: 0, B: 0 },
  activeTeam: "A",
  opened: {}, // keys: catIndex-valueIndex
};

const board = document.getElementById("board");
const overlay = document.getElementById("overlay");
const modalCategory = document.getElementById("modalCategory");
const modalValue = document.getElementById("modalValue");
const modalQuestion = document.getElementById("modalQuestion");
const answerInput = document.getElementById("answerInput");
const scoreAEl = document.getElementById("scoreA");
const score = document.getElementById("scoreB");
const rotateToggle = document.getElementById("rotateToggle");

function formatMoney(money) {
  return `$${money.toLocaleString()}`;
}

function renderBoard() {
  board.innerHTML = "";
  state.data.forEach((col, ci) => {
    const cat = document.createElement("div");
    cat.className = "category";
    const h = document.createElement("h3");
    h.textContent = col.category.toUpperCase();
    cat.appendChild(h);

    const valuesContainer = document.createElement("div");
    valuesContainer.className = "values";
    col.clues.forEach((clue, vi) => {
      const tile = document.createElement("div");
      tile.className = "tile";
      const key = `${ci}-${vi}`;
      if (state.opened[key]) tile.classList.add("disabled");

      // if rotate is on, show rotated characters stacked
      const span = document.createElement("span");
      span.textContent = formatMoney(clue.value);
      if (rotateToggle.checked) {
        span.className = "rotated";
      }
      tile.appendChild(span);

      tile.tabIndex = 0;
      tile.setAttribute("role", "button");
      tile.setAttribute("aria-pressed", !!state.opened[key]);

      tile.addEventListener("click", () => openClue(ci, vi, tile));
      tile.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openClue(ci, vi, tile);
        }
      });

      valuesContainer.appendChild(tile);
    });

    cat.appendChild(valuesContainer);
    board.appendChild(cat);
  });
}

function openClue(ci, vi, tileEl) {
  const clue = state.data[ci].clues[vi];
  // record opened to disable tile
  const key = `${ci}-${vi}`;
  state.opened[key] = true;
  // show modal
  modalCategory.textContent = state.data[ci].category;
  modalValue.textContent = formatMoney(clue.value);
  modalQuestion.textContent = clue.question;
  answerInput.value = "";
  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden", "false");
  answerInput.focus();

  // tie buttons to actions using closure
  const correctBtn = document.getElementById("correctBtn");
  const wrongBtn = document.getElementById("wrongBtn");
  const stealBtn = document.getElementById("stealBtn");

  function markCorrect() {
    awardPoints(clue.value);
    closeModal();
    tileEl.classList.add("disabled");
    correctBtn.removeEventListener("click", markCorrect);
    wrongBtn.removeEventListener("click", markWrong);
    stealBtn.removeEventListener("click", doSteal);
  }
  function markWrong() {
    // no points for active team; optionally let host subtract or not.
    // Common play: wrong removes points from team; we will subtract value.
    awardPoints(-clue.value);
    closeModal();
    tileEl.classList.add("disabled");
    correctBtn.removeEventListener("click", markCorrect);
    wrongBtn.removeEventListener("click", markWrong);
    stealBtn.removeEventListener("click", doSteal);
  }
  function doSteal() {
    // subtract from active team, give to other (simulate steal)
    const other = state.activeTeam === "A" ? "B" : "A";
    state.scores[state.activeTeam] -= clue.value;
    state.scores[other] += clue.value;
    updateScores();
    closeModal();
    tileEl.classList.add("disabled");
    correctBtn.removeEventListener("click", markCorrect);
    wrongBtn.removeEventListener("click", markWrong);
    stealBtn.removeEventListener("click", doSteal);
  }

  correctBtn.onclick = markCorrect;
  wrongBtn.onclick = markWrong;
  stealBtn.onclick = doSteal;
}

function closeModal() {
  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden", "true");
}

function awardPoints(amount) {
  state.scores[state.activeTeam] += amount;
  updateScores();
}

function updateScores() {
  scoreAEl.textContent = state.scores.A;
  scoreBEl.textContent = state.scores.B;
}

// reset board and state
document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Reset the board and scores?")) return;
  state.data = JSON.parse(JSON.stringify(initialData));
  state.scores = { A: 0, B: 0 };
  state.activeTeam = "A";
  state.opened = {};
  updateScores();
  renderBoard();
});

// team switch
const toggleTeamBtn = document.getElementById("toggleTeam");
toggleTeamBtn.addEventListener("click", () => {
  state.activeTeam = state.activeTeam === "A" ? "B" : "A";
  toggleTeamBtn.textContent = "Switch Team (Active: " + state.activeTeam + ")";
  toggleTeamBtn.focus();
});
toggleTeamBtn.textContent = "Switch Team (Active: " + state.activeTeam + ")";

// close handlers
document.getElementById("closeModal").addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

// keyboard: Enter in input tries to auto-check simple match vs answer then mark correct
answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const typed = answerInput.value.trim().toLowerCase();
    // find the clue currently shown in modal by value & category
    const cat = modalCategory.textContent;
    const val = Number(modalValue.textContent.replace(/[^0-9]/g, ""));
    let found;
    for (let c of state.data) {
      if (c.category === cat) {
        found = c.clues.find((cl) => cl.value === val);
        break;
      }
    }
    if (found) {
      // simple string contains check
      const expected = found.answer.toLowerCase();
      const autoCorrect =
        expected === typed ||
        expected.includes(typed) ||
        typed.includes(expected);
      if (autoCorrect && typed.length > 0) {
        awardPoints(found.value);
      } else {
        // mark wrong by default (deduct)
        awardPoints(-found.value);
      }
      // find tile and disable visually
      // we will re-render to reflect disabled state
      renderBoard();
      closeModal();
    }
  }
});

// rotate toggle modifies style and re-renders
rotateToggle.addEventListener("change", () => {
  if (rotateToggle.checked) {
    board.classList.add("vertical-values");
  } else {
    board.classList.remove("vertical-values");
  }
  renderBoard();
});

// steal button in modal already exists above - ensure it works for keyboard
document.getElementById("correctBtn").addEventListener("keydown", (e) => {
  if (e.key === "Enter") e.target.click();
});
document.getElementById("wrongBtn").addEventListener("keydown", (e) => {
  if (e.key === "Enter") e.target.click();
});

// init
renderBoard();
updateScores();
