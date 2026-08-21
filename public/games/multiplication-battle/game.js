(() => {
  const problemEl = document.getElementById("problem");
  const hpEl = document.getElementById("hp");
  const scoreEl = document.getElementById("score");
  const waveEl = document.getElementById("wave");
  const invadersEl = document.getElementById("invaders");
  const answerForm = document.getElementById("answerForm");
  const answerInput = document.getElementById("answerInput");
  const hintEl = document.getElementById("hint");
  const startOverlay = document.getElementById("startOverlay");
  const endOverlay = document.getElementById("endOverlay");
  const endTitle = document.getElementById("endTitle");
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const finalScoreEl = document.getElementById("finalScore");

  const MAX_HP = 5;
  let hp = MAX_HP;
  let score = 0;
  let wave = 1;
  let current = null;
  let invaderEl = null;
  let invaderTimeout = null;
  let running = false;

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function spawnInvader() {
    invadersEl.innerHTML = "";
    invaderEl = document.createElement("div");
    invaderEl.className = "invader";
    invaderEl.textContent = "👾";
    invaderEl.style.left = "0%";
    invadersEl.appendChild(invaderEl);

    // trigger transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        invaderEl.style.left = "82%";
      });
    });

    const travelTime = Math.max(1800, 3600 - wave * 150);
    invaderEl.style.transition = `left ${travelTime}ms linear`;

    invaderTimeout = setTimeout(() => {
      takeDamage();
    }, travelTime);
  }

  function newProblem() {
    const a = randInt(2, 10);
    const b = randInt(2, 10);
    current = { a, b, correct: a * b };
    problemEl.textContent = `${a} \u00d7 ${b}`;
    answerInput.value = "";
    hintEl.textContent = "";
    hintEl.className = "hint";
    spawnInvader();
  }

  function takeDamage() {
    hp -= 1;
    hpEl.textContent = String(Math.max(0, hp));
    hintEl.textContent = "The invader reached the castle!";
    hintEl.className = "hint wrong";
    if (hp <= 0) {
      endGame(false);
    } else {
      setTimeout(newProblem, 700);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!running || !current) return;
    const value = Number(answerInput.value);
    clearTimeout(invaderTimeout);

    if (value === current.correct) {
      score += 15 + wave * 2;
      scoreEl.textContent = String(score);
      hintEl.textContent = "Direct hit! 💥";
      hintEl.className = "hint correct";
      if (invaderEl) invaderEl.remove();

      if (score > wave * 60) {
        wave += 1;
        waveEl.textContent = String(wave);
      }
      setTimeout(newProblem, 500);
    } else {
      hintEl.textContent = `Not quite — it was ${current.correct}.`;
      hintEl.className = "hint wrong";
      takeDamage();
    }
  }

  function startGame() {
    hp = MAX_HP;
    score = 0;
    wave = 1;
    running = true;
    hpEl.textContent = String(hp);
    scoreEl.textContent = "0";
    waveEl.textContent = "1";
    startOverlay.classList.add("hidden");
    endOverlay.classList.add("hidden");
    newProblem();
    answerInput.focus();
  }

  function endGame(won) {
    running = false;
    clearTimeout(invaderTimeout);
    invadersEl.innerHTML = "";
    endTitle.textContent = won ? "🏆 Victory!" : "🏰 Castle Overrun!";
    finalScoreEl.textContent = `Score: ${score} — Wave ${wave}`;
    endOverlay.classList.remove("hidden");
  }

  answerForm.addEventListener("submit", handleSubmit);
  startBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", startGame);
})();
