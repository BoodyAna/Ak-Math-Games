import { useCallback, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Maximize, Play, RotateCcw } from "lucide-react";
import { useGame } from "../hooks/useGames";
import DifficultyBadge from "../components/DifficultyBadge";
import ErrorState from "../components/ErrorState";
import { formatGradeLabel } from "../utils/gameUtils";

export default function GameLaunch() {
  const { gameId } = useParams<{ gameId: string }>();
  const game = useGame(gameId);

  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const frameWrapperRef = useRef<HTMLDivElement>(null);

  const handleLoad = useCallback(() => setStatus("loaded"), []);
  const handleError = useCallback(() => setStatus("error"), []);

  const handleStart = () => {
    setStatus("loading");
    setStarted(true);
  };

  const handleRetry = () => {
    setStatus("loading");
    if (iframeRef.current && game) {
      // Force a reload by resetting the src
      iframeRef.current.src = game.gameUrl;
    }
  };

  const handleFullscreen = () => {
    frameWrapperRef.current?.requestFullscreen?.();
  };

  if (!game) {
    return (
      <section className="container-page py-20">
        <ErrorState
          title="We couldn't find that game."
          message="It may have been removed, or the link is incorrect."
        />
      </section>
    );
  }

  return (
    <>
      <title>{`${game.title} — AK Math Games`}</title>
      <meta name="description" content={game.description} />

      <section className="border-b border-ink/8 bg-notebook py-10">
        <div className="container-page">
          <Link
            to="/games"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 hover:text-ink"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Games
          </Link>

          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                <span className="mr-2" aria-hidden="true">
                  {game.emoji}
                </span>
                {game.title}
              </h1>
              <p className="mt-2 max-w-2xl text-ink/60">{game.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-white px-2.5 py-1 font-mono font-semibold text-ink/70 shadow-sm">
                  {formatGradeLabel(game.grade)}
                </span>
                <span className="rounded-full bg-white px-2.5 py-1 font-medium text-ink/70 shadow-sm">
                  {game.topic}
                </span>
                <DifficultyBadge difficulty={game.difficulty} />
              </div>
            </div>

            {!started && (
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-ink shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <Play size={16} aria-hidden="true" />
                Play Game
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        {!started ? (
          <button
            type="button"
            onClick={handleStart}
            className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl2 border border-ink/8 bg-notebook shadow-card"
          >
            <img
              src={game.thumbnail}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-40 transition group-hover:scale-105"
            />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-amber text-ink shadow-card-hover transition group-hover:scale-110">
              <Play size={26} fill="currentColor" aria-hidden="true" />
            </span>
          </button>
        ) : (
          <div>
            {status === "error" ? (
              <ErrorState />
            ) : (
              <div
                ref={frameWrapperRef}
                className="relative overflow-hidden rounded-xl2 border border-ink/8 bg-ink shadow-card"
              >
                {status === "loading" && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-notebook">
                    <div className="flex flex-col items-center gap-3 text-ink/50">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink/20 border-t-teal" />
                      <p className="text-sm font-medium">Loading {game.title}…</p>
                    </div>
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src={game.gameUrl}
                  title={game.title}
                  onLoad={handleLoad}
                  onError={handleError}
                  className="aspect-video w-full"
                  sandbox="allow-scripts allow-same-origin allow-pointer-lock"
                  allow="fullscreen"
                />

                <div className="flex items-center justify-end gap-2 border-t border-white/10 bg-ink/95 px-3 py-2">
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    <RotateCcw size={14} aria-hidden="true" />
                    Restart
                  </button>
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    <Maximize size={14} aria-hidden="true" />
                    Fullscreen
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <Link
            to="/games"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/30"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Games
          </Link>
        </div>
      </section>
    </>
  );
}
