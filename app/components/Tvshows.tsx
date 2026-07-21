import LoadMoreButton from "./LoadMoreButton";
import { getPopularTvShows } from "../lib/tmdbtv";

export default async function Tvshows({ page = 1 }: { page: number }) {
  const data = await getPopularTvShows(page);
  const shows = data.results.slice(0, 6);
  const imageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p/w500";

  return (
    <section id="tvshows" className="relative bg-slate-950 px-4 py-16 sm:px-6 lg:px-8 border-t border-violet-900/20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between border-b border-violet-900/30 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
              Trending TV Shows
            </h2>
            <p className="mt-1 text-sm text-violet-200/60">
              Popular TV series everyone is watching this week.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-900/30 text-cyan-300 border border-cyan-500/20">
            ✦ Popular Series
          </span>
        </div>

        <LoadMoreButton initialItems={shows} page={page} imageUrl={imageUrl} type="tv" />
      </div>
    </section>
  );
}
