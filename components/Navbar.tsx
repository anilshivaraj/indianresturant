"use client";

import Link from "next/link";
import CartIcon from "./CartIcon";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-[rgba(179,139,44,0.25)]">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[var(--maroon)] ring-2 ring-[var(--gold)]" />
          <span className="text-xl font-semibold heading-serif text-[var(--maroon)]">
            Annapoorna
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/menu" className="hover:text-[var(--maroon)] transition-colors">Menu</Link>
          <Link href="/cart" className="hidden sm:inline-flex rounded-full px-4 py-2 text-white bg-[var(--maroon)] shadow">Order Now</Link>
          <CartIcon />
        </nav>
      </div>
    </header>
  );
}


