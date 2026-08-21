import type { Game } from "../types/game";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GAME REGISTRY
 * ─────────────────────────────────────────────────────────────────────────
 *  This is the ONLY file you need to touch to publish a new game.
 *
 *  1. Drop your game's files into  public/games/<your-game-id>/
 *     (it needs at least an index.html — see README.md "Adding a new game")
 *  2. Add one object below describing it.
 *  3. Save. The game now appears automatically on the home page, its
 *     grade page(s), its topic page, the search/library page and gets
 *     its own route at /games/<your-game-id> — with zero other edits.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const games: Game[] = [
  {
    id: "addition-race",
    title: "Addition Race",
    description:
      "Steer a race car down the track by solving addition problems before the clock runs out.",
    grade: [1, 2],
    topic: "Addition",
    difficulty: "Easy",
    thumbnail: "/games/addition-race/thumbnail.svg",
    gameUrl: "/games/addition-race/index.html",
    tags: ["Addition", "Speed", "Arcade"],
    emoji: "🏎️",
  },
  {
    id: "multiplication-battle",
    title: "Multiplication Battle",
    description:
      "Defend your castle by answering multiplication facts correctly before the invaders arrive.",
    grade: [3, 4],
    topic: "Multiplication",
    difficulty: "Medium",
    thumbnail: "/games/multiplication-battle/thumbnail.svg",
    gameUrl: "/games/multiplication-battle/index.html",
    tags: ["Multiplication", "Times Tables", "Strategy"],
    emoji: "🛡️",
  },
  {
    id: "fractions-challenge",
    title: "Fractions Challenge",
    description:
      "Slice pizzas and chocolate bars into equal parts to master comparing and simplifying fractions.",
    grade: [5, 6],
    topic: "Fractions",
    difficulty: "Medium",
    thumbnail: "/games/fractions-challenge/thumbnail.svg",
    gameUrl: "/games/fractions-challenge/index.html",
    tags: ["Fractions", "Visual", "Logic"],
    emoji: "🍕",
  },
  {
  id: "graph-challenge",
  title: "Graph Challenge",
  description: "Read bar graphs from survey results and answer questions about the data — find the most and fewest, work out differences, and add up totals.",
  grade: [2],
  topic: "Tables and graphs",
  difficulty: "Medium",
  thumbnail: "/games/graph-challenge/thumbnail.svg",
  gameUrl: "/games/graph-challenge/index.html",
  tags: ["graphs", "data", "bar-graph", "reading-graphs", "comparing", "survey"],
  emoji: "📊"
},
];
