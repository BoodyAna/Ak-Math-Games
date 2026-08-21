(() => {
  const promptEl = document.getElementById("prompt");
  const pizzaRow = document.getElementById("pizzaRow");
  const feedbackEl = document.getElementById("feedback");
  const scoreEl = document.getElementById("score");
  const roundEl = document.getElementById("round");
  const streakEl = document.getElementById("streak");
  const startOverlay = document.getElementById("startOverlay");
  const endOverlay = document.getElementById("endOverlay");
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const finalScoreEl = document.getElementById("finalScore");

  const TOTAL_ROUNDS = 8;
  const NS = "http://www.w3.org/2000/svg";

  let score = 0;
  let streak = 0;
  let round = 0;
  let current = null;

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function makeFraction() {
    const denominator = randInt(2, 8);
    const numerator = randInt(1, denominator - 1 >= 1 ? denominator - 1 : 1);
    return { numerator, denominator };
  }

  function fractionValue(f) {
    return f.numerator / f.denominator;
  }

  function polarPoint(cx, cy, r, angleDeg) {
    const angle = ((angleDeg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  }

  function drawPizza(f) {
    const size = 140;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 6;

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

    // crust
    const base = document.createElementNS(NS, "circle");
    base.setAttribute("cx", cx);
    base.setAttribute("cy", cy);
    base.setAttribute("r", r);
    base.setAttribute("fill", "#F5A623");
    base.setAttribute("stroke", "#16233D");
    base.setAttribute("stroke-width", "2");
    svg.appendChild(base);

    // slice dividers
    for (let i = 0; i < f.denominator; i++) {
      const angle = (360 / f.denominator) * i;
      const [x, y] = polarPoint(cx, cy, r, angle);
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", cx);
      line.setAttribute("y1", cy);
      line.setAttribute("x2", x);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", "#16233D");
      line.setAttribute("stroke-width", "1.5");
      line.setAttribute("opacity", "0.5");
      svg.appendChild(line);
    }

    // filled wedge representing numerator/denominator
    const sweep = (360 / f.denominator) * f.numerator;
    if (sweep >= 359.9) {
      const filled = document.createElementNS(NS, "circle");
      filled.setAttribute("cx", cx);
      filled.setAttribute("cy", cy);
      filled.setAttribute("r", r);
      filled.setAttribute("fill", "#E8583F");
      svg.appendChild(filled);
    } else {
      const [x1, y1] = polarPoint(cx, cy, r, 0);
      const [x2, y2] = polarPoint(cx, cy, r, sweep);
      const largeArc = sweep > 180 ? 1 : 0;
      const path = document.createElementNS(NS, "path");
      path.setAttribute(
        "d",
        `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      );
      path.setAttribute("fill", "#E8583F");
      path.setAttribute("opacity", "0.85");
      svg.appendChild(path);
    }

    return svg;
  }

  function newRound() {
    round += 1;
    roundEl.textContent = `${round} / ${TOTAL_ROUNDS}`;
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";

    let left = makeFraction();
    let right = makeFraction();
    while (fractionValue(left) === fractionValue(right)) {
      right = makeFraction();
    }

    const rightBigger = fractionValue(right) > fractionValue(left);
    current = { left, right, correct: rightBigger ? "right" : "left" };

    promptEl.textContent = "Which slice shows the bigger fraction?";
    pizzaRow.innerHTML = "";

    [
      { key: "left", fraction: left },
      { key: "right", fraction: right },
    ].forEach(({ key, fraction }) => {
      const wrapper = document.createElement("button");
      wrapper.type = "button";
      wrapper.className = "pizza-option";
      wrapper.appendChild(drawPizza(fraction));

      const label = document.createElement("span");
      label.className = "fraction-label";
      label.textContent = `${fraction.numerator}/${fraction.denominator}`;
      wrapper.appendChild(label);

      wrapper.addEventListener("click", () => handleChoice(key, wrapper));
      pizzaRow.appendChild(wrapper);
    });
  }

  function handleChoice(key, btn) {
    if (!current) return;
    const isCorrect = key === current.correct;
    btn.classList.add(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      score += 10 + streak * 2;
      streak += 1;
      feedbackEl.textContent = "Correct! 🎉";
      feedbackEl.className = "feedback correct";
    } else {
      streak = 0;
      feedbackEl.textContent = "Not quite — look again!";
      feedbackEl.className = "feedback wrong";
    }

    scoreEl.textContent = String(score);
    streakEl.textContent = String(streak);

    setTimeout(() => {
      if (round < TOTAL_ROUNDS) {
        newRound();
      } else {
        endGame();
      }
    }, 700);
  }

  function startGame() {
    score = 0;
    streak = 0;
    round = 0;
    scoreEl.textContent = "0";
    streakEl.textContent = "0";
    startOverlay.classList.add("hidden");
    endOverlay.classList.add("hidden");
    newRound();
  }

  function endGame() {
    finalScoreEl.textContent = `Score: ${score} out of a possible ${TOTAL_ROUNDS * 10}+`;
    endOverlay.classList.remove("hidden");
  }

  startBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", startGame);
})();
