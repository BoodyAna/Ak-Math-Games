import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Game } from "../types/game";
import DifficultyBadge from "./DifficultyBadge";
import { formatGradeLabel } from "../utils/gameUtils";

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link
      to={`/games/${game.id}`}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-ink/8 bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-notebook">
        <img
          src={game.thumbnail}
          alt={`${game.title} thumbnail`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-xs font-semibold text-ink shadow-sm">
          {formatGradeLabel(game.grade)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink">
            <span className="mr-1.5" aria-hidden="true">
              {game.emoji}
            </span>
            {game.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-ink/50">
          <span className="rounded-full bg-ink/5 px-2.5 py-0.5 font-medium text-ink/70">
            {game.topic}
          </span>
          <DifficultyBadge difficulty={game.difficulty} />
        </div>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-ink/60">
          {game.description}
        </p>

        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-chalk">
          Play Now
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
