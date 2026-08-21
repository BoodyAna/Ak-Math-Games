import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <title>Page Not Found — AK Math Games</title>
      <section className="container-page flex flex-col items-center gap-4 py-28 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber">
          <Compass size={26} aria-hidden="true" />
        </span>
        <h1 className="font-display text-3xl font-bold text-ink">404 — Page not found</h1>
        <p className="max-w-sm text-ink/55">
          That page doesn't add up. Let's get you back to solving problems, not finding them.
        </p>
        <Link
          to="/"
          className="mt-2 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          Back to Home
        </Link>
      </section>
    </>
  );
}
