import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Puzzle, Sparkles } from "lucide-react";
import { useGames } from "../hooks/useGames";
import { getGradeSummaries, getTopicSummaries } from "../utils/gameUtils";
import GameGrid from "../components/GameGrid";
import GradeCard from "../components/GradeCard";
import TopicCard from "../components/TopicCard";
import SectionHeading from "../components/SectionHeading";
import FloatingSymbols from "../components/FloatingSymbols";

export default function Home() {
  const games = useGames();
  const gradeSummaries = useMemo(() => getGradeSummaries(games), [games]);
  const topicSummaries = useMemo(() => getTopicSummaries(games), [games]);
  const featuredGrades = gradeSummaries.filter((g) => g.gameCount > 0).slice(0, 6);
  const featuredTopics = topicSummaries.slice(0, 4);
  const featuredGames = games.slice(0, 4);

  return (
    <>
      <title>AK Math Games — Learn Math. Play. Master It.</title>
      <meta
        name="description"
        content="Interactive math games for grades 1-9. Practice addition, multiplication, fractions and more — free, and made by a Mathematics teacher."
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-notebook">
        <FloatingSymbols />
        <div className="container-page relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-chalk shadow-sm ring-1 ring-inset ring-chalk-100">
              <Sparkles size={14} aria-hidden="true" />
              Built by a Mathematics teacher, for students
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-6xl">
              Learn Math.
              <br />
              <span className="text-chalk">Play.</span>{" "}
              <span className="text-amber-600">Master It.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/60">
              Interactive math games designed to make learning mathematics fun — organized by
              grade and topic, ready to play right in your browser.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/games"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover sm:w-auto"
              >
                Explore Games
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                to="/grades"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink/30 sm:w-auto"
              >
                Choose Your Grade
                <GraduationCap size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-8 font-mono text-sm text-ink/50">
              <div>
                <p className="text-xl font-bold text-ink">{games.length}</p>
                <p>Games</p>
              </div>
              <div>
                <p className="text-xl font-bold text-ink">{topicSummaries.length}</p>
                <p>Topics</p>
              </div>
              <div>
                <p className="text-xl font-bold text-ink">9</p>
                <p>Grades</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade selection */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Start here"
            title="Choose your grade"
            description="Every grade has its own set of games, automatically pulled together from the game library."
          />
          <Link
            to="/grades"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-chalk hover:underline"
          >
            View all grades <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featuredGrades.map((g) => (
            <GradeCard key={g.grade} {...g} />
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="bg-white/60 py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Or browse by subject"
              title="Popular topics"
              description="From addition to fractions — jump straight to the kind of problem you want to practice."
            />
            <Link
              to="/topics"
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-chalk hover:underline"
            >
              View all topics <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTopics.map((t) => (
              <TopicCard key={t.slug} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured games */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Fresh from the library"
            title="Featured games"
            description="A taste of what's inside — every game opens right in your browser, no downloads needed."
          />
          <Link
            to="/games"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-chalk hover:underline"
          >
            View full library <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8">
          <GameGrid games={featuredGames} />
        </div>
      </section>

      {/* For teachers/parents strip */}
      <section className="bg-ink py-14">
        <div className="container-page flex flex-col items-center gap-4 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-amber">
            <Puzzle size={20} aria-hidden="true" />
          </span>
          <h2 className="max-w-xl text-xl font-semibold text-white sm:text-2xl">
            Made by a teacher who wanted a better way to practice.
          </h2>
          <p className="max-w-lg text-sm text-white/60">
            Every game on AK Math Games is designed around a real classroom concept — no ads, no
            sign-up required to play.
          </p>
          <Link
            to="/about"
            className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Meet the teacher
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
