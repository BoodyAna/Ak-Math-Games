import { useMemo } from "react";
import { useGames } from "../hooks/useGames";
import { getGradeSummaries } from "../utils/gameUtils";
import GradeCard from "../components/GradeCard";
import SectionHeading from "../components/SectionHeading";

export default function GradesOverview() {
  const games = useGames();
  const summaries = useMemo(() => getGradeSummaries(games), [games]);

  return (
    <>
      <title>Browse by Grade — AK Math Games</title>
      <meta
        name="description"
        content="Browse AK Math Games by grade level, from Grade 1 through Grade 9."
      />

      <section className="container-page py-14 sm:py-20">
        <SectionHeading
          eyebrow="Grades"
          title="Browse by grade"
          description="Each grade page automatically groups its games by topic — nothing here is hardcoded."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {summaries.map((g) => (
            <GradeCard key={g.grade} {...g} />
          ))}
        </div>
      </section>
    </>
  );
}
