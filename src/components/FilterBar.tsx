import type { Difficulty } from "../types/game";
import { ALL_GRADES } from "../utils/gameUtils";

interface FilterBarProps {
  grade: number | "all";
  onGradeChange: (grade: number | "all") => void;
  topic: string | "all";
  onTopicChange: (topic: string | "all") => void;
  topicOptions: string[];
  difficulty: Difficulty | "all";
  onDifficultyChange: (difficulty: Difficulty | "all") => void;
  sort: string;
  onSortChange: (sort: string) => void;
}

const selectClass =
  "rounded-full border border-ink/12 bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-ink focus:border-teal";

export default function FilterBar({
  grade,
  onGradeChange,
  topic,
  onTopicChange,
  topicOptions,
  difficulty,
  onDifficultyChange,
  sort,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <label className="flex items-center gap-2 text-sm text-ink/60">
        <span className="sr-only">Grade</span>
        <select
          value={grade}
          onChange={(e) => onGradeChange(e.target.value === "all" ? "all" : Number(e.target.value))}
          className={selectClass}
        >
          <option value="all">All grades</option>
          {ALL_GRADES.map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm text-ink/60">
        <span className="sr-only">Topic</span>
        <select value={topic} onChange={(e) => onTopicChange(e.target.value)} className={selectClass}>
          <option value="all">All topics</option>
          {topicOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm text-ink/60">
        <span className="sr-only">Difficulty</span>
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value as Difficulty | "all")}
          className={selectClass}
        >
          <option value="all">All difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </label>

      <label className="ml-auto flex items-center gap-2 text-sm text-ink/60">
        <span className="sr-only">Sort by</span>
        <select value={sort} onChange={(e) => onSortChange(e.target.value)} className={selectClass}>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
          <option value="difficulty-asc">Difficulty: Easy first</option>
          <option value="difficulty-desc">Difficulty: Hard first</option>
          <option value="grade-asc">Grade: lowest first</option>
        </select>
      </label>
    </div>
  );
}
