import { getPopularTvShows } from "../../../lib/tmdbtv";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page")) || 1);

  try {
    const data = await getPopularTvShows(page);
    return NextResponse.json({
      results: data.results.slice(0, 6),
      total_pages: data.total_pages,
      page,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch TV shows" }, { status: 500 });
  }
}
