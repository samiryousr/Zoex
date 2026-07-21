'use client'
import Image from "next/image";
import { useState, useEffect } from "react";

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

const TYPING_WORDS = ["Favorite Movie", "TV Show", "Anime", "Cinematic Story"];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    let timer: NodeJS.Timeout;

    const typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && displayText === currentWord) {
      // Pause at the end of the word
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentWord.substring(0, displayText.length - 1)
            : currentWord.substring(0, displayText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section className="relative flex min-h-[50vh] sm:min-h-[55vh] items-center justify-center overflow-hidden px-4 pt-32 pb-20 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8 bg-slate-950">
      {/* Background Images - Slow 10s alternation transition */}
      <div className="absolute inset-0">
        {BACKDROPS.map((backdrop, index) => (
          <div
            key={backdrop.src}
            className="absolute inset-0 animate-hero-slide opacity-0"
            style={{ animationDelay: `${index * 10}s` }}
          >
            <Image
              src={backdrop.src}
              alt={backdrop.alt}
              fill
              priority={index === 0}
              className="object-cover object-center brightness-[0.88] contrast-[1.02]"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Clean Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Find Your Next{" "}
          <span className="block mt-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent min-h-[1.2em]">
            {displayText}
            <span className="inline-block w-1.5 h-8 sm:h-12 ml-1 bg-cyan-400 animate-[pulse_0.8s_infinite] align-middle" />
          </span>
        </h1>

        
      </div>
    </section>
  );
}
