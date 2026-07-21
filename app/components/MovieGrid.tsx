import { getPopularMovies } from "../lib/movies";
import LoadMoreButton from "./LoadMoreButton";

export default async function MovieGrid({ page = 1 }: { page: number }) {
  const data = await getPopularMovies(page);
  const MOVIES = data.results.slice(0, 8);
  const imageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p/w500";
  
  return (
    <section id="content" className="relative bg-slate-950 px-4 pt-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between border-b border-violet-900/30 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
              Trending Movies
            </h2>
            <p className="mt-1 text-sm text-violet-200/60">
              Popular picks everyone is watching this week.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-900/30 text-cyan-300 border border-violet-500/20">
            ✦ Updated Today
          </span>
        </div>

        <LoadMoreButton initialItems={MOVIES} page={page} imageUrl={imageUrl} type="movie" />
      </div>
    </section>
  );
}
