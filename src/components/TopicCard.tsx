import { Link } from "react-router-dom";
import { Shapes } from "lucide-react";
import type { TopicSummary } from "../types/game";

export default function TopicCard({ topic, slug, gameCount }: TopicSummary) {
  return (
    <Link
      to={`/topic/${slug}`}
      className="group flex items-center gap-4 rounded-xl2 border border-ink/8 bg-white p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:border-chalk/40 hover:shadow-card-hover"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-chalk-50 text-chalk">
        <Shapes size={20} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className="truncate font-display text-base font-semibold text-ink">{topic}</h3>
        <p className="text-sm text-ink/55">
          {gameCount} {gameCount === 1 ? "game" : "games"}
        </p>
      </div>
    </Link>
  );
}
