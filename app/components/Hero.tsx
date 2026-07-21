import Image from "next/image";

const BACKDROPS = [
  {
    src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80",
    alt: "Cinema seats with dramatic lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1536440136620-849eb1785640?auto=format&fit=crop&w=1920&q=80",
    alt: "Movie theater screen in the dark",
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[50vh] sm:min-h-[55vh] items-center justify-center overflow-hidden px-4 pt-32 pb-20 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8 bg-slate-950">
      {/* Background Images */}
      <div className="absolute inset-0">
        {BACKDROPS.map((backdrop, index) => (
          <div
            key={backdrop.src}
            className="absolute inset-0 animate-hero-slide opacity-0"
            style={{ animationDelay: `${index * 1}s` }}
          >
            <Image
              src={backdrop.src}
              alt={backdrop.alt}
              fill
              priority={index === 0}
              className="object-cover object-center brightness-75"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Main Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/80 via-slate-950/70 to-cyan-950/75" />

      {/* Bottom Fade Gradient for Perfect Seamless Transition to Movie Section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

      {/* Glowing Ambient Light Orbs */}
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl animate-hero-glow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl animate-hero-drift"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-3xl animate-hero-drift"
        style={{ animationDelay: "3s" }}
        aria-hidden
      />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-950/40 px-4 py-1.5 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-violet-200 uppercase">Discover Millions of Movies & TV Shows</span>
        </div>

        <h1 className="text-xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-3xl lg:text-7xl">
          Find Your Next{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]">
            Favorite Movie
          </span>
        </h1>


      </div>
    </section>
  );
}
