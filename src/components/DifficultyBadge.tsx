import type { Difficulty } from "../types/game";

const STYLES: Record<Difficulty, string> = {
  Easy: "bg-teal-50 text-teal-500 ring-1 ring-inset ring-teal-200",
  Medium: "bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-200",
  Hard: "bg-coral-50 text-coral-500 ring-1 ring-inset ring-coral-200",
};

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${STYLES[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
