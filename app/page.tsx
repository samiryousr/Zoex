import Hero from "./components/Hero";
import MovieGrid from "./components/MovieGrid";
import Header from "./components/Header";
import Tvshows from "./components/Tvshows";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  return (
    <>
     <Header />
      <Hero />
      <MovieGrid page={Number(page) || 1} />
      <Tvshows page={Number(page) || 1} />
    </>
  );
}