import { Rocket } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "No games available yet.",
  message = "New challenges are coming soon.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl2 border border-dashed border-ink/15 bg-white/60 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber">
        <Rocket size={22} aria-hidden="true" />
      </span>
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="max-w-sm text-sm text-ink/55">{message}</p>
    </div>
  );
}
