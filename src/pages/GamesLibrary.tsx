import { useMemo, useState } from "react";
import { useGames } from "../hooks/useGames";
import { filterGames, getTopicSummaries } from "../utils/gameUtils";
import type { Difficulty } from "../types/game";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import GameGrid from "../components/GameGrid";
import SectionHeading from "../components/SectionHeading";

export default function GamesLibrary() {
  const games = useGames();
  const topicSummaries = useMemo(() => getTopicSummaries(games), [games]);

  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState<number | "all">("all");
  const [topic, setTopic] = useState<string | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [sort, setSort] = useState("title-asc");

  const results = useMemo(
    () =>
      filterGames(games, {
        query,
        grade,
        topic,
        difficulty,
        sort: sort as any,
      }),
    [games, query, grade, topic, difficulty, sort],
  );

  return (
    <>
      <title>Game Library — AK Math Games</title>
      <meta
        name="description"
        content="Search and filter the full AK Math Games library by grade, topic and difficulty."
      />

      <section className="border-b border-ink/8 bg-notebook py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow="Game Library"
            title="Every game, in one place"
            description="Search by name, or filter by grade, topic and difficulty to find your next challenge."
          />

          <div className="mt-8 flex flex-col gap-4">
            <div className="max-w-xl">
              <SearchBar value={query} onChange={setQuery} />
            </div>
            <FilterBar
              grade={grade}
              onGradeChange={setGrade}
              topic={topic}
              onTopicChange={setTopic}
              topicOptions={topicSummaries.map((t) => t.topic)}
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              sort={sort}
              onSortChange={setSort}
            />
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <p className="mb-6 text-sm font-medium text-ink/50">
          {results.length} {results.length === 1 ? "game" : "games"} found
        </p>
        <GameGrid
          games={results}
          emptyTitle="No games match your filters."
          emptyMessage="Try a different grade, topic or search term — new challenges are coming soon too."
        />
      </section>
    </>
  );
}
