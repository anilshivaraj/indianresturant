"use client";

import Link from "next/link";
import { useCart } from "@/app/providers";

export default function CartIcon() {
  const { items } = useCart();
  const count = items.reduce((n, it) => n + it.qty, 0);

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6 text-[var(--maroon)]"
        aria-hidden
      >
        <path d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9h14m-8-3a1 1 0 100-2 1 1 0 000 2zm6 1a1 1 0 110-2 1 1 0 010 2z"/>
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-1.5 text-[10px] font-semibold text-white shadow">
          {count}
        </span>
      )}
      <span className="sr-only">Cart</span>
    </Link>
  );
}


