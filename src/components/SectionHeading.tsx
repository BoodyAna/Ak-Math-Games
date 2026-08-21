interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-teal">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-relaxed text-ink/60">{description}</p>}
    </div>
  );
}
