import { useMemo } from "react";
import { useGames } from "../hooks/useGames";
import { getTopicSummaries } from "../utils/gameUtils";
import TopicCard from "../components/TopicCard";
import SectionHeading from "../components/SectionHeading";

export default function TopicsOverview() {
  const games = useGames();
  const summaries = useMemo(() => getTopicSummaries(games), [games]);

  return (
    <>
      <title>Browse by Topic — AK Math Games</title>
      <meta
        name="description"
        content="Browse AK Math Games by topic — addition, multiplication, fractions and more."
      />

      <section className="container-page py-14 sm:py-20">
        <SectionHeading
          eyebrow="Topics"
          title="Browse by topic"
          description="Topics are derived directly from the game registry — add a game with a new topic and a page appears here automatically."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summaries.map((t) => (
            <TopicCard key={t.slug} {...t} />
          ))}
        </div>
      </section>
    </>
  );
}
