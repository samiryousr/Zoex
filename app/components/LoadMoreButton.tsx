'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type MediaItem = {
  id: number;
  poster_path: string | null;
  vote_average: number;
  original_language: string;
  title?: string;
  release_date?: string;
  name?: string;
  first_air_date?: string;
};

interface LoadMoreButtonProps {
  initialItems: MediaItem[];
  page: number;
  imageUrl: string;
  type: 'movie' | 'tv';
}

export default function LoadMoreButton({ initialItems, page, imageUrl, type }: LoadMoreButtonProps) {
  const [items, setItems] = useState<MediaItem[]>(initialItems);
  const [currentPage, setCurrentPage] = useState(page);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const endpoint = type === 'movie' ? 'movies' : 'tv';
      const apiUrl = `/api/${endpoint}/popular?page=${currentPage + 1}`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.error(`API Error: ${response.status} ${response.statusText}`);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();

      if (data.results && Array.isArray(data.results)) {
        const newItems = data.results;
        setItems((prev) => [...prev, ...newItems]);      
        setCurrentPage((prev) => prev + 1);
      } else {
        console.warn('No results in API response:', data);
      }
    } catch (error) {
      console.error('Error loading more items:', error);
      alert(`خطأ في تحميل المزيد: ${error instanceof Error ? error.message : 'حاول لاحقاً'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = (item: MediaItem) =>
    type === 'movie'
      ? item.title || item.name || 'Untitled'
      : item.name || item.title || 'Untitled';

  const getYear = (item: MediaItem) =>
    type === 'movie'
      ? item.release_date?.slice(0, 4) || 'N/A'
      : item.first_air_date?.slice(0, 4) || 'N/A';

  const getHref = (item: MediaItem) => `/${type}/${item.id}`;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <Link href={getHref(item)} key={item.id}>
            <article className="cursor-pointer hover:bg-violet-900/100 group overflow-hidden rounded-xl sm:rounded-2xl border border-violet-800/50 bg-violet-900/40 backdrop-blur-sm transition hover:border-cyan-400/40 hover:shadow-lg hover:shadow-violet-900/50">
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={item.poster_path ? `${imageUrl}${item.poster_path}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80'}
                  alt={`${getTitle(item)} poster`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <span className="absolute right-2 top-2 sm:right-3 sm:top-3 rounded-full bg-violet-950/80 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-cyan-300 backdrop-blur-sm">
                  ★ {item.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="p-2.5 sm:p-4">
                <h3 className="text-xs sm:text-base font-bold text-white truncate" title={getTitle(item)}>{getTitle(item)}</h3>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-violet-200/60">
                  {getYear(item)} · {item.original_language.toUpperCase()}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <button
        onClick={handleLoadMore}
        disabled={isLoading}
        className="flex justify-center items-center mx-auto mt-8 cursor-pointer text-white rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-900/40 transition hover:from-violet-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'جاري التحميل...' : 'عرض المزيد'}
      </button>
    </>
  );
}
