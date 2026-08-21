import { Link } from "react-router-dom";
import type { GradeSummary } from "../types/game";

const GRADE_DESCRIPTIONS: Record<number, string> = {
  1: "First steps with numbers",
  2: "Building number sense",
  3: "Times tables take off",
  4: "Multi-digit confidence",
  5: "Fractions & decimals",
  6: "Ratios & pre-algebra",
  7: "Expressions & integers",
  8: "Functions & geometry",
  9: "Algebra foundations",
};

export default function GradeCard({ grade, gameCount }: GradeSummary) {
  return (
    <Link
      to={`/grade/${grade}`}
      className="group flex flex-col justify-between rounded-xl2 border border-ink/8 bg-white p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:border-teal/40 hover:shadow-card-hover"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink font-display text-lg font-bold text-amber transition group-hover:scale-105">
          {grade}
        </span>
        <span className="font-mono text-xs font-semibold text-ink/40">
          {gameCount} {gameCount === 1 ? "game" : "games"}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="font-display text-base font-semibold text-ink">Grade {grade}</h3>
        <p className="mt-1 text-sm text-ink/55">
          {GRADE_DESCRIPTIONS[grade] ?? "Practice makes progress"}
        </p>
      </div>
    </Link>
  );
}
