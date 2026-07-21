// دي صفحه الفلم نفسه 

import Image from "next/image";
import TrailerSection from "../../components/TrailerPlayer";
import TrailerButtonWrapper from "../../components/TrailerButtonWrapper";
import { getTvById, getTvVideos } from "../../lib/tmdbtv";
import { pickTrailer } from "../../lib/movies";
const cast = [
  { name: "Lina Ortiz", role: "Aria Vale", initials: "LO" },
  { name: "Marcus Hale", role: "Theo Cross", initials: "MH" },
  { name: "Nadia Chen", role: "Dr. Sera Kade", initials: "NC" },
  { name: "Julian Reed", role: "Noah Voss", initials: "JR" },
];

const similarMovies = [
  {
    title: "Neon Horizon",
    year: "2025",
    poster:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Velvet Static",
    year: "2024",
    poster:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Afterglow",
    year: "2023",
    poster:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Silver Echo",
    year: "2022",
    poster:
      "https://images.unsplash.com/photo-1478720568477-152d9b403e24?auto=format&fit=crop&w=900&q=80",
  },
];

export default async function TvPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [show, videosData] = await Promise.all([
    getTvById(id),
    getTvVideos(id),
  ]);
  const trailer = pickTrailer(videosData.results);
  const title = show.name ?? show.title;
  const year = (show.first_air_date || show.release_date || "").slice(0, 4);

  return (
    <main className="min-h-screen bg-[#040816] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${show.backdrop_path}`}
            alt={`${title} backdrop`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040816] via-[#040816]/80 to-[#040816]/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.28),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.2),_transparent_30%)]" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end">
            <div className="mx-auto w-full max-w-[260px] lg:mx-0 lg:max-w-[320px]">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-2 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}${show.poster_path}`}
                  alt={`${title} poster`}
                  width={800}
                  height={1200}
                  className="h-auto w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>

            <div className="flex-1 rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
                  Now Streaming
                </span>
                <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-200">
                  Premium Pick
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-medium text-white/80">
                  ★ {show.vote_average}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              <p className="mt-3 text-lg italic text-violet-200/80 sm:text-xl">
                “{show.tagline}”
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-violet-100/80">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">
                  {year}
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">
                  N/A
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">
                  {show.genres?.map((g: any) => g.name).join(" • ")}
                </span>
              </div>

              <p className="mt-8 max-w-3xl text-base leading-8 text-slate-200/90 sm:text-lg">
                {show.overview}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="cursor-pointer rounded-full bg-gradient-to-r from-violet-600/50 to-cyan-400/50 px-5 py-3 text-sm font-semibold text-white/70 shadow-lg shadow-violet-900/20">
                ▶  Watch now
                </button>
                {trailer ? (
                  <TrailerButtonWrapper
                    youtubeKey={trailer.key}
                    title={`${title} — ${trailer.name}`}
                  />
                ) : (
                  <button
                    
                    className="cursor-pointer rounded-full bg-gradient-to-r from-violet-600/50 to-cyan-400/50 px-5 py-3 text-sm font-semibold text-white/70 shadow-lg shadow-violet-900/20"
                  >
                    ▶ No Trailer Available
                  </button>
                )}
                <button className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-cyan-400/40 hover:bg-cyan-400/10">
                  ☆ Rate Show
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {trailer && (
        <TrailerSection
          youtubeKey={trailer.key}
          title={`${title} trailer`}
          trailerName={trailer.name}
        />
      )}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Story Synopsis
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              A cinematic glimpse into the unknown
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              The story layers drama, emotion, and cinematic pacing into a modern series experience that feels immersive and impossible to stop watching.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-violet-950/80 to-slate-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Essentials
            </p>
            <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-slate-400">Episodes</p>
                <p className="mt-1 font-semibold text-white">{show.number_of_episodes ?? "N/A"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-slate-400">Seasons</p>
                <p className="mt-1 font-semibold text-white">{show.number_of_seasons ?? "N/A"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-slate-400">Status</p>
                <p className="mt-1 font-semibold text-white">{show.status || "N/A"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-slate-400">Original Language</p>
                <p className="mt-1 font-semibold text-white">{show.original_language || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Cast
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Featured performers</h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cast.map((person) => (
            <div
              key={person.name}
              className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.2)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 text-lg font-semibold text-white">
                  {person.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{person.name}</h3>
                  <p className="text-sm text-slate-400">{person.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Similar Titles
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">You might also love</h2>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {similarMovies.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-xl sm:rounded-[1.5rem] border border-white/10 bg-slate-950/60 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.poster}
                  alt={`${item.title} poster`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-xs sm:text-base font-bold text-white truncate" title={item.title}>{item.title}</h3>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-sm text-slate-400">{item.year}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
