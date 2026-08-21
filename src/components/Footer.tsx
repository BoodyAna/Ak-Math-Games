import { Link } from "react-router-dom";
import { Sigma } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-ink text-white/80">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber text-ink">
              <Sigma size={18} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span className="font-display text-base font-bold text-white">AK Math Games</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            Free interactive math games built by a Mathematics teacher, for students who learn
            best by playing.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white/50">
            Explore
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/games" className="hover:text-amber">
                Game Library
              </Link>
            </li>
            <li>
              <Link to="/grades" className="hover:text-amber">
                Browse by Grade
              </Link>
            </li>
            <li>
              <Link to="/topics" className="hover:text-amber">
                Browse by Topic
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white/50">
            About
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-amber">
                Meet the Teacher
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white/50">
            Coming Soon
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li>Student accounts &amp; XP</li>
            <li>Teacher dashboard</li>
            <li>Adaptive challenges</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AK Math Games. Made for curious students.</p>
          <p>A Mathematics Teacher project by Mr. Abdullah Khaled.</p>
        </div>
      </div>
    </footer>
  );
}
