import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Sigma } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/games", label: "Games" },
  { to: "/grades", label: "Grades" },
  { to: "/topics", label: "Topics" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
      isActive ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-paper/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-amber">
            <Sigma size={20} strokeWidth={2.5} aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold leading-none text-ink">
            AK Math <span className="text-chalk">Games</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <NavLink
            to="/games"
            className="inline-flex items-center rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            Explore Games
          </NavLink>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-ink/8 bg-paper px-4 pb-4 pt-2 md:hidden"
          aria-label="Primary mobile"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/games"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink"
            >
              Explore Games
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
