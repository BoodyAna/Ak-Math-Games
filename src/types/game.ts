/**
 * The single source of truth for a game's metadata.
 *
 * The React application never imports a game's implementation directly.
 * It only ever reads this shape, so any game that satisfies it can be
 * dropped into `src/data/games.ts` and it will appear everywhere it
 * should — the home page, grade pages, topic pages and the game
 * library — with no other code changes.
 */
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Game {
  /** Unique, URL-safe identifier. Matches the folder name in /public/games */
  id: string;
  /** Display title shown on cards and the launch page */
  title: string;
  /** One or two sentence summary shown on cards and the launch page */
  description: string;
  /** All grades this game is appropriate for, e.g. [1, 2] */
  grade: number[];
  /** Primary topic used for grouping and the /topic/:slug route */
  topic: string;
  /** Difficulty shown as a badge */
  difficulty: Difficulty;
  /** Path to a thumbnail image/SVG, served from /public */
  thumbnail: string;
  /** Path to the game's own index.html, served from /public/games */
  gameUrl: string;
  /** Optional freeform tags used by search */
  tags?: string[];
  /** Optional short label for the emoji/icon shown on the card, e.g. "🏎️" */
  emoji?: string;
}

/** A grade entry, derived at runtime from the registry — never hand-authored. */
export interface GradeSummary {
  grade: number;
  gameCount: number;
}

/** A topic entry, derived at runtime from the registry — never hand-authored. */
export interface TopicSummary {
  topic: string;
  slug: string;
  gameCount: number;
}
