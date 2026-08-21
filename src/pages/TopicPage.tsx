import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGames } from "../hooks/useGames";
import { getGamesByTopicSlug } from "../utils/gameUtils";
import GameGrid from "../components/GameGrid";
import SectionHeading from "../components/SectionHeading";
import EmptyState from "../components/EmptyState";

export default function TopicPage() {
  const { topicSlug = "" } = useParams<{ topicSlug: string }>();
  const games = useGames();

  const topicGames = useMemo(() => getGamesByTopicSlug(games, topicSlug), [games, topicSlug]);
  const topicName = topicGames[0]?.topic ?? topicSlug.replace(/-/g, " ");

  return (
    <>
      <title>{`${topicName} Games — AK Math Games`}</title>
      <meta
        name="description"
        content={`Practice ${topicName} with interactive AK Math Games.`}
      />

      <section className="border-b border-ink/8 bg-notebook py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow="Topic"
            title={topicName}
            description={`${topicGames.length} ${
              topicGames.length === 1 ? "game" : "games"
            } for this topic, across all grades.`}
          />
        </div>
      </section>

      <section className="container-page py-12">
        {topicGames.length === 0 ? (
          <EmptyState
            title="No games for this topic yet."
            message="New challenges are coming soon 🚀"
          />
        ) : (
          <GameGrid games={topicGames} />
        )}
      </section>
    </>
  );
}
