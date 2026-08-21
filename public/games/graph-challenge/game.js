(function () {
  "use strict";

  /* ============ CONFIG ============ */
  const TOTAL_QUESTIONS = 8;
  const QUESTIONS_PER_GRAPH = 2;
  const BAR_COLORS = ["#2AA9A0", "#F5A623", "#E8583F", "#1F5C4E", "#16233D"];

  const THEMES = [
    { title: "Favorite Fruit Survey", unit: "students", categories: ["Apple", "Banana", "Grape", "Orange", "Strawberry", "Mango"] },
    { title: "Favorite Sport Survey", unit: "votes", categories: ["Soccer", "Basketball", "Swimming", "Tennis", "Baseball", "Hockey"] },
    { title: "Pets Owned Survey", unit: "families", categories: ["Dog", "Cat", "Fish", "Bird", "Hamster", "Turtle"] },
    { title: "Weather This Month", unit: "days", categories: ["Sunny", "Rainy", "Cloudy", "Snowy", "Windy"] },
    { title: "Favorite Season Survey", unit: "students", categories: ["Spring", "Summer", "Fall", "Winter"] },
    { title: "Books Read This Week", unit: "students", categories: ["0-1 books", "2-3 books", "4-5 books", "6+ books"] },
    { title: "Favorite Ice Cream Flavor", unit: "kids", categories: ["Vanilla", "Chocolate", "Strawberry", "Mint", "Cookie Dough"] },
    { title: "School Lunch Choice", unit: "students", categories: ["Pizza", "Salad", "Sandwich", "Pasta", "Tacos"] }
  ];

  /* ============ STATE ============ */
  let state = {
    score: 0,
    qIndex: 0,
    questions: [],
    currentGraph: null,
    answered: false
  };

  /* ============ DOM ============ */
  const $ = (id) => document.getElementById(id);
  const startOverlay = $("start-overlay");
  const endOverlay = $("end-overlay");
  const gameScreen = $("game-screen");
  const startBtn = $("start-btn");
  const playAgainBtn = $("play-again-btn");
  const nextBtn = $("next-btn");
  const liveScoreEl = $("live-score");
  const qIndexEl = $("q-index");
  const qTotalEl = $("q-total");
  const progressFill = $("progress-fill");
  const graphTitleEl = $("graph-title");
  const chartEl = $("chart");
  const yAxisEl = $("y-axis");
  const questionTextEl = $("question-text");
  const choicesGrid = $("choices-grid");
  const feedbackEl = $("feedback");
  const endScoreEl = $("end-score");
  const endTotalEl = $("end-total");
  const endTitleEl = $("end-title");
  const endMessageEl = $("end-message");
  const endIconEl = $("end-icon");

  qTotalEl.textContent = TOTAL_QUESTIONS;
  endTotalEl.textContent = TOTAL_QUESTIONS;

  /* ============ UTILS ============ */
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function sample(arr, n) {
    return shuffle(arr).slice(0, n);
  }

  function pickNiceScale(maxValue) {
    // choose an axis max and tick step that comfortably fits maxValue
    let step;
    if (maxValue <= 10) step = 2;
    else if (maxValue <= 20) step = 4;
    else step = 5;
    const axisMax = Math.ceil((maxValue + 1) / step) * step;
    return { axisMax, step };
  }

  /* ============ GRAPH GENERATION ============ */
  function generateGraph() {
    const theme = THEMES[randInt(0, THEMES.length - 1)];
    const numCats = randInt(4, Math.min(5, theme.categories.length));
    const catNames = sample(theme.categories, numCats);

    // generate distinct values so max/min questions are unambiguous
    const usedValues = new Set();
    const categories = catNames.map((name) => {
      let v;
      do {
        v = randInt(2, 9);
      } while (usedValues.has(v));
      usedValues.add(v);
      return { name, value: v };
    });

    return {
      title: theme.title,
      unit: theme.unit,
      categories
    };
  }

  function renderGraph(graph) {
    graphTitleEl.textContent = graph.title;
    chartEl.innerHTML = "";
    yAxisEl.innerHTML = "";

    const maxVal = Math.max(...graph.categories.map((c) => c.value));
    const { axisMax, step } = pickNiceScale(maxVal);

    // y-axis labels (top to bottom order since column-reverse handles it)
    for (let v = 0; v <= axisMax; v += step) {
      const label = document.createElement("div");
      label.textContent = v;
      yAxisEl.appendChild(label);
    }

    const tickGapPx = 190 / (axisMax / step);
    chartEl.style.setProperty("--tick-gap", tickGapPx + "px");

    graph.categories.forEach((cat, i) => {
      const col = document.createElement("div");
      col.className = "bar-col";

      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.background = BAR_COLORS[i % BAR_COLORS.length];

      const label = document.createElement("div");
      label.className = "bar-label";
      label.textContent = cat.name;

      col.appendChild(bar);
      col.appendChild(label);
      chartEl.appendChild(col);

      const pct = (cat.value / axisMax) * 100;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.height = pct + "%";
        });
      });
    });
  }

  /* ============ QUESTION GENERATION ============ */
  function numericChoices(correct, minBound = 0) {
    const set = new Set([correct]);
    while (set.size < 4) {
      const delta = randInt(-4, 4);
      const candidate = correct + delta;
      if (candidate >= minBound && candidate !== correct) set.add(candidate);
    }
    return shuffle(Array.from(set)).map((n) => ({ label: String(n), value: n }));
  }

  function buildQuestion(type, graph) {
    const cats = graph.categories;

    if (type === "read") {
      const cat = cats[randInt(0, cats.length - 1)];
      const choices = numericChoices(cat.value);
      return {
        prompt: `According to the graph, how many ${graph.unit} chose "${cat.name}"?`,
        choices,
        correctLabel: String(cat.value)
      };
    }

    if (type === "max") {
      const sorted = [...cats].sort((a, b) => b.value - a.value);
      const top = sorted[0];
      const choices = shuffle(cats.map((c) => ({ label: c.name, value: c.name })));
      return {
        prompt: `Which category has the MOST ${graph.unit}?`,
        choices,
        correctLabel: top.name
      };
    }

    if (type === "min") {
      const sorted = [...cats].sort((a, b) => a.value - b.value);
      const bottom = sorted[0];
      const choices = shuffle(cats.map((c) => ({ label: c.name, value: c.name })));
      return {
        prompt: `Which category has the FEWEST ${graph.unit}?`,
        choices,
        correctLabel: bottom.name
      };
    }

    if (type === "difference" && cats.length >= 2) {
      const [a, b] = sample(cats, 2);
      const higher = a.value >= b.value ? a : b;
      const lower = a.value >= b.value ? b : a;
      const diff = higher.value - lower.value;
      const choices = numericChoices(diff);
      return {
        prompt: `How many more ${graph.unit} chose "${higher.name}" than "${lower.name}"?`,
        choices,
        correctLabel: String(diff)
      };
    }

    if (type === "total") {
      const total = cats.reduce((sum, c) => sum + c.value, 0);
      const choices = numericChoices(total);
      return {
        prompt: `What is the TOTAL number of ${graph.unit} shown in this graph?`,
        choices,
        correctLabel: String(total)
      };
    }

    if (type === "compare" && cats.length >= 2) {
      const [a, b] = sample(cats, 2);
      const winner = a.value > b.value ? a : b;
      const choices = shuffle([
        { label: a.name, value: a.name },
        { label: b.name, value: b.name }
      ]);
      return {
        prompt: `Which had more ${graph.unit}: "${a.name}" or "${b.name}"?`,
        choices,
        correctLabel: winner.name
      };
    }

    // fallback
    return buildQuestion("read", graph);
  }

  function generateQuestionSet() {
    const allTypes = ["read", "max", "min", "difference", "total", "compare"];
    const questions = [];
    let remaining = TOTAL_QUESTIONS;

    while (remaining > 0) {
      const graph = generateGraph();
      const count = Math.min(QUESTIONS_PER_GRAPH, remaining);
      const typesForGraph = sample(allTypes, count);

      typesForGraph.forEach((type) => {
        const q = buildQuestion(type, graph);
        q.graph = graph;
        questions.push(q);
      });

      remaining -= count;
    }

    return questions;
  }

  /* ============ GAME FLOW ============ */
  function startGame() {
    state = {
      score: 0,
      qIndex: 0,
      questions: generateQuestionSet(),
      currentGraph: null,
      answered: false
    };

    startOverlay.classList.add("hidden");
    endOverlay.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    liveScoreEl.textContent = "0";
    showQuestion();
  }

  function showQuestion() {
    const q = state.questions[state.qIndex];
    state.answered = false;

    qIndexEl.textContent = state.qIndex + 1;
    progressFill.style.width = ((state.qIndex + 1) / TOTAL_QUESTIONS) * 100 + "%";

    if (!state.currentGraph || state.currentGraph !== q.graph) {
      state.currentGraph = q.graph;
      renderGraph(q.graph);
    }

    questionTextEl.textContent = q.prompt;
    feedbackEl.className = "hidden";
    feedbackEl.textContent = "";
    nextBtn.classList.add("hidden");

    choicesGrid.innerHTML = "";
    q.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice.label;
      btn.addEventListener("click", () => handleAnswer(btn, choice, q));
      choicesGrid.appendChild(btn);
    });
  }

  function handleAnswer(btn, choice, question) {
    if (state.answered) return;
    state.answered = true;

    const isCorrect = String(choice.value) === question.correctLabel;
    const allBtns = choicesGrid.querySelectorAll(".choice-btn");

    allBtns.forEach((b) => {
      b.disabled = true;
      if (b.textContent === question.correctLabel) {
        b.classList.add("correct");
      }
    });

    if (isCorrect) {
      state.score += 1;
      liveScoreEl.textContent = state.score;
      feedbackEl.textContent = "✅ Correct! Nice reading.";
      feedbackEl.className = "is-correct";
    } else {
      btn.classList.add("incorrect");
      feedbackEl.textContent = `❌ Not quite. The correct answer is "${question.correctLabel}".`;
      feedbackEl.className = "is-incorrect";
    }

    nextBtn.classList.remove("hidden");
    nextBtn.textContent = state.qIndex === TOTAL_QUESTIONS - 1 ? "See Results" : "Next Question";
  }

  function goNext() {
    state.qIndex += 1;
    if (state.qIndex >= TOTAL_QUESTIONS) {
      endGame();
    } else {
      showQuestion();
    }
  }

  function endGame() {
    gameScreen.classList.add("hidden");
    endOverlay.classList.remove("hidden");

    endScoreEl.textContent = state.score;

    const pct = state.score / TOTAL_QUESTIONS;
    let title, message, icon;
    if (pct === 1) {
      title = "Perfect Score!";
      message = "You read every graph like a pro. Outstanding work!";
      icon = "🏆";
    } else if (pct >= 0.75) {
      title = "Great Job!";
      message = "You're really good at reading graphs. Keep it up!";
      icon = "🌟";
    } else if (pct >= 0.5) {
      title = "Nice Effort!";
      message = "Solid work! Review the bars carefully and try again to sharpen your score.";
      icon = "👍";
    } else {
      title = "Keep Practicing!";
      message = "Reading graphs takes practice. Take your time comparing the bars and try again!";
      icon = "💪";
    }

    endTitleEl.textContent = title;
    endMessageEl.textContent = message;
    endIconEl.textContent = icon;
  }

  /* ============ EVENTS ============ */
  startBtn.addEventListener("click", startGame);
  playAgainBtn.addEventListener("click", startGame);
  nextBtn.addEventListener("click", goNext);
})();
