'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#content", label: "Movies" },
  { href: "/#tvshows", label: "TV Shows" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const contentElem = document.getElementById("content");
      if (contentElem) {
        contentElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "top-3 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl rounded-full border border-cyan-500/30 bg-slate-950/85 py-2.5 px-4 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-xl"
          : "w-full bg-gradient-to-b from-slate-950/95 via-slate-950/60 to-transparent py-4 px-4 sm:px-6 lg:px-8"
      }`}
    >
      <div className={`mx-auto flex items-center justify-between gap-3 sm:gap-6 transition-all duration-300 ${scrolled ? "w-full" : "max-w-7xl"}`}>
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 flex items-center justify-center shadow-md shadow-violet-500/30 group-hover:scale-105 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <span className="text-white font-black text-lg tracking-tighter">Z</span>
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent group-hover:from-violet-200 group-hover:to-cyan-200 transition-all duration-300">
            zoex
          </span>
        </Link>

        {/* Center Premium Search Bar */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="flex-1 max-w-md mx-2 sm:mx-4"
        >
          <div className="relative flex items-center group">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-cyan-400 group-focus-within:text-cyan-300 transition-colors">
              <svg 
                className="w-4 h-4 transition-transform group-focus-within:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <input
              type="search"
              placeholder="Search movies, TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-violet-500/30 bg-slate-900/80 pl-10 pr-10 sm:pr-14 py-2 text-xs sm:text-sm text-white placeholder:text-violet-200/50 shadow-[0_0_15px_rgba(139,92,246,0.15)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:bg-slate-900/95 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] focus:border-cyan-400 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            />

            {searchQuery ? (
              <button 
                type="button" 
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center absolute right-3 px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-800/80 border border-slate-700/60 rounded-full pointer-events-none">
                ⌘K
              </kbd>
            )}
          </div>
        </form>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-cyan-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
