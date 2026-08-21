import type { Difficulty, Game, GradeSummary, TopicSummary } from "../types/game";

/** All grades the platform currently supports, shown even at zero games. */
export const ALL_GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/** Turns "Addition & Subtraction" into "addition-subtraction" for clean URLs. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Every game that includes the given grade. */
export function getGamesByGrade(games: Game[], grade: number): Game[] {
  return games.filter((game) => game.grade.includes(grade));
}

/** Every game whose topic slug matches the given slug. */
export function getGamesByTopicSlug(games: Game[], topicSlug: string): Game[] {
  return games.filter((game) => slugify(game.topic) === topicSlug);
}

/** Derives a grade -> count summary from the registry. Never hand-maintained. */
export function getGradeSummaries(games: Game[]): GradeSummary[] {
  return ALL_GRADES.map((grade) => ({
    grade,
    gameCount: getGamesByGrade(games, grade).length,
  }));
}

/** Derives the distinct topic list -> count from the registry. Never hand-maintained. */
export function getTopicSummaries(games: Game[]): TopicSummary[] {
  const map = new Map<string, TopicSummary>();
  for (const game of games) {
    const slug = slugify(game.topic);
    const existing = map.get(slug);
    if (existing) {
      existing.gameCount += 1;
    } else {
      map.set(slug, { topic: game.topic, slug, gameCount: 1 });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.topic.localeCompare(b.topic));
}

/** Groups games by their topic, preserving first-seen topic order. Used on grade pages. */
export function groupGamesByTopic(games: Game[]): { topic: string; games: Game[] }[] {
  const order: string[] = [];
  const map = new Map<string, Game[]>();
  for (const game of games) {
    if (!map.has(game.topic)) {
      map.set(game.topic, []);
      order.push(game.topic);
    }
    map.get(game.topic)!.push(game);
  }
  return order.map((topic) => ({ topic, games: map.get(topic)! }));
}

export interface GameFilters {
  query?: string;
  grade?: number | "all";
  topic?: string | "all";
  difficulty?: Difficulty | "all";
  sort?: "title-asc" | "title-desc" | "difficulty-asc" | "difficulty-desc" | "grade-asc";
}

const DIFFICULTY_RANK: Record<Difficulty, number> = { Easy: 0, Medium: 1, Hard: 2 };

/** Applies search + filters + sorting to the registry in one pass. */
export function filterGames(games: Game[], filters: GameFilters): Game[] {
  const { query, grade, topic, difficulty, sort } = filters;
  const q = query?.trim().toLowerCase();

  let result = games.filter((game) => {
    if (q) {
      const haystack = [game.title, game.description, game.topic, ...(game.tags ?? [])]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (grade && grade !== "all" && !game.grade.includes(grade)) return false;
    if (topic && topic !== "all" && slugify(game.topic) !== slugify(topic)) return false;
    if (difficulty && difficulty !== "all" && game.difficulty !== difficulty) return false;
    return true;
  });

  switch (sort) {
    case "title-desc":
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "difficulty-asc":
      result = [...result].sort(
        (a, b) => DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty],
      );
      break;
    case "difficulty-desc":
      result = [...result].sort(
        (a, b) => DIFFICULTY_RANK[b.difficulty] - DIFFICULTY_RANK[a.difficulty],
      );
      break;
    case "grade-asc":
      result = [...result].sort((a, b) => Math.min(...a.grade) - Math.min(...b.grade));
      break;
    case "title-asc":
    default:
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return result;
}

export function formatGradeLabel(grades: number[]): string {
  if (grades.length === 1) return `Grade ${grades[0]}`;
  const sorted = [...grades].sort((a, b) => a - b);
  const isConsecutive = sorted.every((g, i) => i === 0 || g === sorted[i - 1] + 1);
  if (isConsecutive) return `Grades ${sorted[0]}–${sorted[sorted.length - 1]}`;
  return `Grades ${sorted.join(", ")}`;
}
