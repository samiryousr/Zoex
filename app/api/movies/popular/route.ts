import { getPopularMovies } from "../../../lib/movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page")) || 1);

  try {
    const data = await getPopularMovies(page);
    return NextResponse.json({
      results: data.results.slice(0, 6),
      total_pages: data.total_pages,
      page,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
