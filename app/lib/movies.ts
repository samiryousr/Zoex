// صفحه الfunctionsعشان نجيب الapi
type VideoResult = {
  key: string;
  name: string;
  site: string;
  type: string;
  official?: boolean;
};
export async function getPopularMovies(page: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch popular movies: ${res.statusText}`);
  }

  return res.json();
}

export async function getMovieById(id: string){
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?language=en-US`,
    {
      headers:{
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch movie: ${res.statusText}`);
  }
  return res.json();
}

export async function getMovieVideos(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch movie videos: ${res.statusText}`);
  }

  return res.json();
}

export function pickTrailer(videos: VideoResult[]) {
  return (
    videos.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official
    ) ??
    videos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    ) ??
    videos.find((video) => video.site === "YouTube") ??
    null
  );
}