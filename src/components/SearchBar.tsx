import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search games by title, topic or tag…",
}: SearchBarProps) {
  return (
    <label className="relative block">
      <span className="sr-only">Search games</span>
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/35"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-ink/12 bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-teal"
      />
    </label>
  );
}
