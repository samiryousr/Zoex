"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type TvShow = {
  id: number;
  name: string;
  poster_path: string | null;
  vote_average: number;
  first_air_date: string;
  original_language: string;
};

type TrendingTvShowsProps = {
  initialShows: TvShow[];
  initialPage: number;
  totalPages: number;
  imageBaseUrl: string;
};

export default function TrendingTvShows({
  initialShows,
  initialPage,
  totalPages,
  imageBaseUrl,
}: TrendingTvShowsProps) {
  const [shows, setShows] = useState(initialShows);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(totalPages);
  const [loading, setLoading] = useState(false);

  async function loadPage(nextPage: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/tv/popular?page=${nextPage}`);
      if (!res.ok) return;

      const data = await res.json();
      setShows(data.results);
      setPage(data.page);
      setTotal(data.total_pages);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${loading ? "opacity-60" : ""}`}
      >
        {shows.map((show) => (
          <Link href={`/tv/${show.id}`} key={show.id}>
            <article className="group cursor-pointer overflow-hidden rounded-2xl border border-violet-800/50 bg-violet-900/40 backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-violet-900 hover:shadow-lg hover:shadow-violet-900/50">
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={
                    show.poster_path
                      ? `${imageBaseUrl}${show.poster_path}`
                      : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80"
                  }
                  alt={`${show.name} poster`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute right-3 top-3 rounded-full bg-violet-950/80 px-2.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-sm">
                  ★ {show.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  {show.name}
                </h3>
                <p className="mt-1 text-sm text-violet-200/60">
                  {show.first_air_date.slice(0, 4)} · {show.original_language}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

    </>
  );
}
