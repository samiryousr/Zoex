
export async function getPopularTvShows(page: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/popular?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch popular tv shows: ${res.statusText}`);
  }

  return res.json();
}
// دا معمول عشان الزرار اللي هيجيب البيانات 
export async function getTvById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/${id}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch tv show: ${res.statusText}`);
  }

  return res.json();
}

export async function getTvVideos(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/${id}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch tv show videos: ${res.statusText}`);
  }

  return res.json();
}
