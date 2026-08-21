import type { Game } from "../types/game";
import GameCard from "./GameCard";
import EmptyState from "./EmptyState";

interface GameGridProps {
  games: Game[];
  emptyTitle?: string;
  emptyMessage?: string;
}

/**
 * Renders any list of games as a responsive grid.
 * Every page (Home, Games Library, Grade, Topic) feeds its filtered
 * game list through this single component — nobody ever writes out
 * <GameCard /> <GameCard /> <GameCard /> by hand.
 */
export default function GameGrid({ games, emptyTitle, emptyMessage }: GameGridProps) {
  if (games.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
