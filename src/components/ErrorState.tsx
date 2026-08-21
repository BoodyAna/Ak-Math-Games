import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export default function ErrorState({
  title = "Oops! This game couldn't be loaded.",
  message = "It might be missing its files, or your connection dropped. Try again, or head back to the library.",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl2 border border-coral-100 bg-coral-50/50 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-coral-100 text-coral">
        <AlertTriangle size={22} aria-hidden="true" />
      </span>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="max-w-sm text-sm text-ink/60">{message}</p>
      <Link
        to="/games"
        className="mt-2 inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
      >
        Back to Games
      </Link>
    </div>
  );
}
