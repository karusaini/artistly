"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-extrabold text-black tracking-wide"
        >
          Artistly
        </Link>

        <div className="hidden md:flex gap-8 text-black font-medium">
          <Link href="/artists" className="hover:text-gray-600 transition">
            Explore Artists
          </Link>
          <Link href="/onboard" className="hover:text-gray-600 transition">
            Become an Artist
          </Link>
          <Link href="/dashboard" className="hover:text-gray-600 transition">
            Dashboard
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-black"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mt-4 md:hidden bg-white shadow-md rounded-lg py-4 px-6 text-black font-medium flex flex-col gap-4">
          <Link
            href="/artists"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-600 transition"
          >
            Explore Artists
          </Link>
          <Link
            href="/onboard"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-600 transition"
          >
            Become an Artist
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-600 transition"
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
