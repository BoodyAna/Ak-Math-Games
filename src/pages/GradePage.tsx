import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useGames } from "../hooks/useGames";
import { getGamesByGrade, groupGamesByTopic, slugify } from "../utils/gameUtils";
import GameGrid from "../components/GameGrid";
import SectionHeading from "../components/SectionHeading";
import EmptyState from "../components/EmptyState";

export default function GradePage() {
  const { grade: gradeParam } = useParams<{ grade: string }>();
  const grade = Number(gradeParam);
  const games = useGames();

  const gradeGames = useMemo(() => getGamesByGrade(games, grade), [games, grade]);
  const groups = useMemo(() => groupGamesByTopic(gradeGames), [gradeGames]);

  const isValidGrade = Number.isInteger(grade) && grade >= 1 && grade <= 9;

  if (!isValidGrade) {
    return (
      <section className="container-page py-20">
        <EmptyState
          title="That grade doesn't exist."
          message="Choose a grade between 1 and 9 from the grades page."
        />
      </section>
    );
  }

  return (
    <>
      <title>{`Grade ${grade} Math Games — AK Math Games`}</title>
      <meta
        name="description"
        content={`Interactive math games for Grade ${grade}, organized by topic.`}
      />

      <section className="border-b border-ink/8 bg-notebook py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow={`Grade ${grade}`}
            title={`Grade ${grade} Math Games`}
            description={`${gradeGames.length} ${
              gradeGames.length === 1 ? "game" : "games"
            } available, grouped automatically by topic.`}
          />
        </div>
      </section>

      <section className="container-page py-12">
        {groups.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-14">
            {groups.map(({ topic, games: topicGames }) => (
              <div key={topic} className="notebook-margin pl-8">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-ink">{topic}</h2>
                  <Link
                    to={`/topic/${slugify(topic)}`}
                    className="text-sm font-semibold text-chalk hover:underline"
                  >
                    View all {topic} games
                  </Link>
                </div>
                <GameGrid games={topicGames} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
