// ============================================================
// SPROUT WORDLE
// A Wordle clone themed around this site's world: plants,
// homelab, astronomy, speedcubing, dance, and tea.
// Renders into #sprout-wordle, next to the Now Playing widgets.
// ============================================================
(function () {
  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;

  const ANSWERS = [
    "PLANT", "EARTH", "SEEDS", "GROWN", "BLOOM", "ROOTS", "GRAIN", "VINES",
    "TULIP", "MULCH", "SOLAR", "LUNAR", "COMET", "ORBIT", "STARS", "NIGHT",
    "SPACE", "PIXEL", "RETRO", "CLOUD", "ADMIN", "TUNER", "AUDIO", "BRASS",
    "STEPS", "DANCE", "CUBED", "SCRUB", "TIMER", "GREEN", "LEAFY", "SKATE",
    "DEBUG", "PATCH", "CODED", "TREES",
  ];

  const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
  ];

  const STATUS_RANK = { absent: 0, present: 1, correct: 2 };

  function getStatuses(guess, answer) {
    const result = Array(WORD_LENGTH).fill("absent");
    const answerLetters = answer.split("");
    const used = Array(WORD_LENGTH).fill(false);

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guess[i] === answerLetters[i]) {
        result[i] = "correct";
        used[i] = true;
      }
    }

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (result[i] === "correct") continue;
      const matchIndex = answerLetters.findIndex(
        (letter, j) => letter === guess[i] && !used[j]
      );
      if (matchIndex !== -1) {
        result[i] = "present";
        used[matchIndex] = true;
      }
    }

    return result;
  }

  function pickAnswer() {
    return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
  }

  let answer = "";
  let guesses = [];
  let current = "";
  let status = "playing";
  let keyStatuses = {};
  let messageTimeout = null;

  let boardEl, keyboardEl, messageEl, footerEl;

  function flashMessage(text) {
    messageEl.textContent = text;
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
      messageEl.textContent = "";
    }, 1400);
  }

  function submitGuess() {
    if (status !== "playing") return;

    if (current.length !== WORD_LENGTH) {
      flashMessage("not enough letters");
      return;
    }

    const guess = current.toUpperCase();
    const result = getStatuses(guess, answer);

    guess.split("").forEach((letter, i) => {
      if (!keyStatuses[letter] || STATUS_RANK[result[i]] > STATUS_RANK[keyStatuses[letter]]) {
        keyStatuses[letter] = result[i];
      }
    });

    guesses.push({ word: guess, result });
    current = "";

    if (guess === answer) {
      status = "won";
      flashMessage(`nice — grown in ${guesses.length}`);
    } else if (guesses.length >= MAX_GUESSES) {
      status = "lost";
      flashMessage(answer);
    }

    render();
  }

  function handleKey(key) {
    if (status !== "playing") return;

    if (key === "ENTER") {
      submitGuess();
    } else if (key === "BACK") {
      current = current.slice(0, -1);
      render();
    } else if (/^[A-Z]$/.test(key) && current.length < WORD_LENGTH) {
      current += key;
      render();
    }
  }

  function resetGame() {
    answer = pickAnswer();
    guesses = [];
    current = "";
    status = "playing";
    keyStatuses = {};
    flashMessage("");
    render();
  }

  function copyResult() {
    const grid = guesses
      .map((g) =>
        g.result
          .map((r) => (r === "correct" ? "🟩" : r === "present" ? "🟨" : "⬛"))
          .join("")
      )
      .join("\n");
    const text = `sprout wordle ${status === "won" ? guesses.length : "X"}/${MAX_GUESSES}\n${grid}`;
    navigator.clipboard?.writeText(text);
    flashMessage("copied to clipboard");
  }

  function render() {
    boardEl.innerHTML = "";
    for (let i = 0; i < MAX_GUESSES; i++) {
      const row =
        guesses[i] ||
        (i === guesses.length ? { word: current, result: null } : { word: "", result: null });

      const rowEl = document.createElement("div");
      rowEl.className = "wordle-row";

      for (let j = 0; j < WORD_LENGTH; j++) {
        const tile = document.createElement("div");
        const cls = row.result ? row.result[j] : "";
        tile.className = `wordle-tile ${cls}`.trim();
        tile.textContent = row.word[j] || "";
        rowEl.appendChild(tile);
      }

      boardEl.appendChild(rowEl);
    }

    keyboardEl.querySelectorAll(".wordle-key").forEach((btn) => {
      const key = btn.dataset.key;
      btn.className = `wordle-key ${key.length > 1 ? "wide" : ""} ${keyStatuses[key] || ""}`.trim();
    });

    footerEl.hidden = status === "playing";
  }

  function buildKeyboard() {
    keyboardEl.innerHTML = "";
    KEYBOARD_ROWS.forEach((row) => {
      const rowEl = document.createElement("div");
      rowEl.className = "wordle-krow";

      row.forEach((key) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `wordle-key ${key.length > 1 ? "wide" : ""}`.trim();
        btn.dataset.key = key;
        btn.textContent = key === "BACK" ? "⌫" : key;
        btn.setAttribute("aria-label", key === "BACK" ? "Backspace" : key === "ENTER" ? "Enter" : key);
        btn.addEventListener("click", () => handleKey(key));
        rowEl.appendChild(btn);
      });

      keyboardEl.appendChild(rowEl);
    });
  }

  function onKeyDown(e) {
    const target = e.target;
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

    const key = e.key.toUpperCase();
    if (key === "ENTER") handleKey("ENTER");
    else if (key === "BACKSPACE") handleKey("BACK");
    else if (/^[A-Z]$/.test(key)) handleKey(key);
  }

  function init() {
    const root = document.getElementById("sprout-wordle");
    if (!root) return;

    root.innerHTML = `
      <div class="wordle-title">Sprout Wordle — guess the word</div>
      <div class="wordle-message" aria-live="polite"></div>
      <div class="wordle-board" role="group" aria-label="Guess grid"></div>
      <div class="wordle-keyboard" role="group" aria-label="On-screen keyboard"></div>
      <div class="wordle-footer" hidden>
        <button type="button" class="wordle-btn" data-action="share">Share</button>
        <button type="button" class="wordle-btn" data-action="replant">Replant</button>
      </div>
    `;

    boardEl = root.querySelector(".wordle-board");
    keyboardEl = root.querySelector(".wordle-keyboard");
    messageEl = root.querySelector(".wordle-message");
    footerEl = root.querySelector(".wordle-footer");

    footerEl.querySelector('[data-action="share"]').addEventListener("click", copyResult);
    footerEl.querySelector('[data-action="replant"]').addEventListener("click", resetGame);

    buildKeyboard();
    answer = pickAnswer();
    document.addEventListener("keydown", onKeyDown);
    render();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
