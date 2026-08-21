const SYMBOLS = [
  { char: "+", top: "12%", left: "6%", delay: "0s", size: "text-4xl", color: "text-amber" },
  { char: "÷", top: "68%", left: "10%", delay: "1.2s", size: "text-3xl", color: "text-coral" },
  { char: "×", top: "20%", left: "88%", delay: "0.6s", size: "text-5xl", color: "text-teal" },
  { char: "=", top: "78%", left: "84%", delay: "1.8s", size: "text-3xl", color: "text-chalk" },
  { char: "π", top: "45%", left: "94%", delay: "0.3s", size: "text-2xl", color: "text-amber" },
  { char: "%", top: "8%", left: "45%", delay: "2.2s", size: "text-2xl", color: "text-coral" },
];

/** Purely decorative floating symbols used behind the hero copy. */
export default function FloatingSymbols() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SYMBOLS.map((s, i) => (
        <span
          key={i}
          className={`absolute font-display font-bold opacity-20 animate-float ${s.size} ${s.color}`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
