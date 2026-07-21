"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  original_language: string;
};

type TrendingMoviesProps = {
  initialMovies: Movie[];
  initialPage: number;
  totalPages: number;
  imageBaseUrl: string;
};

export default function TrendingMovies({
  initialMovies,
  initialPage,
  totalPages,
  imageBaseUrl,
}: TrendingMoviesProps) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(totalPages);
  const [loading, setLoading] = useState(false);

  async function loadPage(nextPage: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/movies/popular?page=${nextPage}`);
      if (!res.ok) return;

      const data = await res.json();
      setMovies(data.results);
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
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <article className="group cursor-pointer overflow-hidden rounded-2xl border border-violet-800/50 bg-violet-900/40 backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-violet-900 hover:shadow-lg hover:shadow-violet-900/50">
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={
                    movie.poster_path
                      ? `${imageBaseUrl}${movie.poster_path}`
                      : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80"
                  }
                  alt={`${movie.title} poster`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute right-3 top-3 rounded-full bg-violet-950/80 px-2.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-sm">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  {movie.title}
                </h3>
                <p className="mt-1 text-sm text-violet-200/60">
                  {movie.release_date.slice(0, 4)} · {movie.original_language}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

    </>
  );
}
