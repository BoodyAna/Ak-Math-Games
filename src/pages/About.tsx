import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Sparkles, Target } from "lucide-react";
import { useGames } from "../hooks/useGames";
import SectionHeading from "../components/SectionHeading";

export default function About() {
  const games = useGames();

  return (
    <>
      <title>About — AK Math Games</title>
      <meta
        name="description"
        content="AK Math Games is an educational project created by Mathematics teacher Abdullah Khaled to make math learning interactive."
      />

      <section className="border-b border-ink/8 bg-notebook py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="About the project"
            title="Math practice that feels like play"
            description="AK Math Games is an educational project created by a Mathematics teacher to make learning mathematics more interactive through games."
          />
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="order-2 rounded-xl2 border border-ink/8 bg-white p-8 shadow-card lg:order-1">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink font-display text-2xl font-bold text-amber">
                AK
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-ink">Mr. Abdullah Khaled</h2>
                <p className="text-sm text-ink/55">
                  Mathematics Teacher &amp; Educational Technology Enthusiast
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink/65">
              After years in the classroom, I kept noticing the same thing: students who
              struggled with a topic on paper would light up the moment it became a game.
              AK Math Games started as a handful of practice tools I built for my own
              students, and grew into a small library anyone can use for free.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              Every game here is built around a real classroom concept — no ads, no accounts
              required to play, just focused practice.
            </p>

            <Link
              to="/games"
              className="mt-6 inline-flex items-center rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink shadow-card transition hover:-translate-y-0.5"
            >
              Explore the games
            </Link>
          </div>

          <div className="order-1 grid grid-cols-2 gap-4 lg:order-2">
            <div className="col-span-2 rounded-xl2 bg-ink p-6 text-white">
              <p className="font-mono text-3xl font-bold">{games.length}</p>
              <p className="mt-1 text-sm text-white/60">Games in the library and growing</p>
            </div>
            <FeatureStat
              icon={<Target size={18} aria-hidden="true" />}
              label="Grade-aligned"
              desc="Every game is tagged to the grades it fits."
            />
            <FeatureStat
              icon={<BookOpen size={18} aria-hidden="true" />}
              label="Classroom-tested"
              desc="Concepts drawn from real lesson plans."
            />
            <FeatureStat
              icon={<Sparkles size={18} aria-hidden="true" />}
              label="Free to play"
              desc="No sign-up needed to start playing."
            />
            <FeatureStat
              icon={<GraduationCap size={18} aria-hidden="true" />}
              label="Always growing"
              desc="New games added on a regular basis."
            />
          </div>
        </div>
      </section>

      <section className="bg-white/60 py-16">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="What's next"
            title="Where AK Math Games is headed"
            description="Version 1 is focused on giving every student a great library of games. Here's what's planned as the project grows."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <RoadmapCard
              version="V2"
              title="Accounts & progress"
              items={["Student sign-in", "XP & achievements", "Progress tracking"]}
            />
            <RoadmapCard
              version="V3"
              title="For teachers"
              items={["Class management", "Assignments", "Performance reports"]}
            />
            <RoadmapCard
              version="V4"
              title="Adaptive learning"
              items={["AI-generated challenges", "Personalized difficulty", "Parent dashboard"]}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureStat({
  icon,
  label,
  desc,
}: {
  icon: ReactNode;
  label: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl2 border border-ink/8 bg-white p-5 shadow-card">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal">
        {icon}
      </span>
      <p className="mt-3 text-sm font-semibold text-ink">{label}</p>
      <p className="mt-1 text-xs text-ink/55">{desc}</p>
    </div>
  );
}

function RoadmapCard({ version, title, items }: { version: string; title: string; items: string[] }) {
  return (
    <div className="notebook-margin rounded-xl2 border border-ink/8 bg-white p-6 pl-10 shadow-card">
      <span className="font-mono text-xs font-semibold uppercase tracking-widest text-coral">
        {version}
      </span>
      <h3 className="mt-1 font-display text-lg font-semibold text-ink">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-ink/60">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
