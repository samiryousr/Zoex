'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: (
    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )},
  { href: "/#content", label: "Movies", icon: (
    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
  )},
  { href: "/#tvshows", label: "TV Shows", icon: (
    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )},
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "top-3 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl rounded-[24px] border border-cyan-500/30 bg-slate-950/90 py-2.5 px-4 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_20px_rgba(34,211,238,0.25)] backdrop-blur-xl"
          : "w-full bg-gradient-to-b from-slate-950/95 via-slate-950/60 to-transparent py-4 px-4 sm:px-6 lg:px-8"
      }`}
    >
      <div className={`mx-auto flex flex-col gap-2 transition-all duration-300 ${scrolled ? "w-full" : "max-w-7xl"}`}>
        
        {/* Main Row */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 relative">
          {isMobileSearchOpen ? (
            /* Mobile Search Overlay inside the header bar */
            <form 
              onSubmit={handleSearchSubmit} 
              className="flex-1 flex items-center gap-2 w-full animate-[hero-glow_0.2s_ease-out]"
            >
              <div className="relative flex-1 flex items-center group">
                <div className="absolute left-3.5 flex items-center pointer-events-none text-cyan-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  autoFocus
                  type="search"
                  placeholder="Search movies, TV shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-cyan-400/60 bg-slate-950/90 pl-10 pr-10 py-1.5 text-xs text-white placeholder:text-violet-200/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 text-xs text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button 
                type="button" 
                onClick={() => setIsMobileSearchOpen(false)}
                className="text-xs text-slate-300 hover:text-cyan-400 font-semibold px-2 py-1 transition-colors"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2 shrink-0 group"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 flex items-center justify-center shadow-md shadow-violet-500/30 group-hover:scale-105 group-hover:shadow-cyan-500/40 transition-all duration-300">
                  <span className="text-white font-black text-sm sm:text-lg tracking-tighter">Z</span>
                </div>
                <span className="text-lg sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent group-hover:from-violet-200 group-hover:to-cyan-200 transition-all duration-300">
                  zoex
                </span>
              </Link>

              {/* Desktop Search Bar (hidden on mobile) */}
              <form 
                onSubmit={handleSearchSubmit} 
                className="hidden sm:block flex-1 max-w-md mx-4"
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
                    className="w-full rounded-full border border-violet-500/30 bg-slate-900/80 pl-10 pr-14 py-2 text-sm text-white placeholder:text-violet-200/50 shadow-[0_0_15px_rgba(139,92,246,0.15)] backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:bg-slate-900/95 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] focus:border-cyan-400 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
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

              {/* Desktop Nav Links & Mobile Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                {/* Mobile Search Button */}
                <button 
                  type="button"
                  onClick={() => {
                    setIsMobileSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="sm:hidden p-2 rounded-full border border-violet-500/20 bg-slate-900/60 text-cyan-400 hover:border-cyan-400/50 hover:bg-slate-900/95 transition-all duration-300"
                  aria-label="Open search"
                >
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {/* Mobile Hamburger Menu Toggle (2-line aesthetic menu design) */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="sm:hidden p-2.5 rounded-full border border-violet-500/20 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-slate-900/95 transition-all duration-300"
                  aria-label="Toggle menu"
                >
                  <div className="w-5 h-5 flex flex-col justify-center gap-1.5 items-end">
                    {isMobileMenuOpen ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <>
                        <span className="w-5 h-0.5 bg-cyan-400 rounded-full transition-all duration-300" />
                        <span className="w-3.5 h-0.5 bg-slate-300 rounded-full transition-all duration-300" />
                      </>
                    )}
                  </div>
                </button>

                {/* Desktop-only Navigation Links */}
                <nav className="hidden sm:flex items-center gap-1 sm:gap-2">
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
            </>
          )}
        </div>

        {/* Mobile Navigation Dropdown Menu - Sleek Glass Card shape */}
        {isMobileMenuOpen && !isMobileSearchOpen && (
          <nav className="sm:hidden mt-2 p-2.5 rounded-2xl bg-slate-950/95 border border-cyan-500/20 backdrop-blur-xl shadow-2xl flex flex-col gap-1 animate-[hero-glow_0.2s_ease-out]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide text-slate-300 hover:text-cyan-300 hover:bg-slate-900/60 border border-transparent hover:border-cyan-500/10 transition-all duration-200"
              >
                <span className="text-cyan-400/80">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        )}

      </div>
    </header>
  );
}
