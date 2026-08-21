(() => {
  const problemEl = document.getElementById("problem");
  const answersEl = document.getElementById("answers");
  const scoreEl = document.getElementById("score");
  const timeEl = document.getElementById("time");
  const streakEl = document.getElementById("streak");
  const carEl = document.getElementById("car");
  const startOverlay = document.getElementById("startOverlay");
  const endOverlay = document.getElementById("endOverlay");
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const finalScoreEl = document.getElementById("finalScore");

  const ROUND_SECONDS = 30;
  let score = 0;
  let streak = 0;
  let timeLeft = ROUND_SECONDS;
  let timer = null;
  let current = null;

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function newProblem() {
    const a = randInt(1, 10);
    const b = randInt(1, 10);
    const correct = a + b;

    const options = new Set([correct]);
    while (options.size < 4) {
      const delta = randInt(-5, 5);
      const candidate = correct + delta;
      if (candidate >= 0 && candidate !== correct) options.add(candidate);
    }

    current = { a, b, correct };
    problemEl.textContent = `${a} + ${b}`;

    const shuffled = Array.from(options).sort(() => Math.random() - 0.5);
    answersEl.innerHTML = "";
    shuffled.forEach((value) => {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.type = "button";
      btn.textContent = value;
      btn.addEventListener("click", () => handleAnswer(value, btn));
      answersEl.appendChild(btn);
    });
  }

  function handleAnswer(value, btn) {
    if (!current) return;
    const isCorrect = value === current.correct;
    btn.classList.add(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      score += 10 + streak * 2;
      streak += 1;
      moveCar();
    } else {
      streak = 0;
    }

    scoreEl.textContent = String(score);
    streakEl.textContent = String(streak);

    setTimeout(() => {
      if (timeLeft > 0) newProblem();
    }, 250);
  }

  function moveCar() {
    const progress = Math.min(94, (score / 200) * 94);
    carEl.style.left = `${progress}%`;
  }

  function tick() {
    timeLeft -= 1;
    timeEl.textContent = String(Math.max(0, timeLeft));
    if (timeLeft <= 0) endGame();
  }

  function startGame() {
    score = 0;
    streak = 0;
    timeLeft = ROUND_SECONDS;
    scoreEl.textContent = "0";
    streakEl.textContent = "0";
    timeEl.textContent = String(ROUND_SECONDS);
    carEl.style.left = "0%";
    startOverlay.classList.add("hidden");
    endOverlay.classList.add("hidden");
    newProblem();
    clearInterval(timer);
    timer = setInterval(tick, 1000);
  }

  function endGame() {
    clearInterval(timer);
    answersEl.innerHTML = "";
    problemEl.textContent = "Time's up!";
    finalScoreEl.textContent = `Score: ${score}`;
    endOverlay.classList.remove("hidden");
  }

  startBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", startGame);
})();
