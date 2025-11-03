"use client";

import Link from "next/link";
import { useCart } from "@/app/providers";

export default function CartBar() {
  const { items, total } = useCart();
  const count = items.reduce((n, it) => n + it.qty, 0);
  if (count === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[rgba(179,139,44,0.25)] bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="text-[var(--maroon)] font-semibold">{count} item{count>1?'s':''} • ₹{total()}</div>
        <Link href="/cart" className="inline-flex items-center justify-center rounded-full px-4 py-2 text-white bg-[var(--maroon)] shadow">View Cart</Link>
      </div>
    </div>
  );
}


