import { useMemo } from "react";
import { games } from "../data/games";
import type { Game } from "../types/game";

/**
 * Returns the full game registry.
 *
 * Version 1 reads the static `games.ts` file. This hook is the one seam
 * to change if Version 2+ moves the registry behind an API — every page
 * already reads through this hook rather than importing `games` directly,
 * so that future change stays isolated here.
 */
export function useGames(): Game[] {
  return useMemo(() => games, []);
}

export function useGame(id: string | undefined): Game | undefined {
  const all = useGames();
  return useMemo(() => all.find((g) => g.id === id), [all, id]);
}
