"use client";

type TrailerPlayerProps = {
  youtubeKey: string;
  title: string;
}; 

export function WatchTrailerButton({ youtubeKey, title }: TrailerPlayerProps) {
  const handleScrollToTrailer = () => {
    const trailerSection = document.getElementById('trailer');
    if (trailerSection) {
      trailerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTrailer}
      className="cursor-pointer text-white rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-900/40 transition hover:from-violet-500 hover:to-cyan-400"
    >
      ▶ Watch Trailer
    </button>
  );
}

export default function TrailerSection({
  youtubeKey,
  title,
  trailerName,
}: TrailerPlayerProps & { trailerName: string }) {
  return (
    <section id="trailer" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Trailer
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Watch the preview</h2>
        <p className="mt-2 text-sm text-slate-400">{trailerName}</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/55 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeKey}?rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
