"use client";

import { useEffect, useMemo, useState } from "react";
import DishCard, { DishItem } from "@/components/DishCard";
import PromoStrip from "@/components/PromoStrip";

export default function MenuPage() {
  const [items, setItems] = useState<DishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("All");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/menu", { cache: "no-store" });
        const data = await res.json();
        setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    items.forEach((i) => i.category && set.add(i.category));
    return Array.from(set);
  }, [items]);

  const filtered = useMemo(() => {
    if (category === "All") return items;
    return items.filter((i) => (i.category ?? "") === category);
  }, [items, category]);

  return (
    <main className="py-6 md:py-8">
      <div className="mb-3 md:mb-4">
        <h1 className="heading-serif text-3xl md:text-4xl text-[var(--maroon)]">Our Menu</h1>
        <p className="text-[var(--coffee)]/80">Freshly made South Indian favourites</p>
      </div>
      <PromoStrip />
      <div className="sticky top-[64px] z-40 -mx-4 bg-[var(--cream)]/95 px-4 py-3 backdrop-blur border-y border-[rgba(179,139,44,0.25)]">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition shadow-sm ${
                category === c
                  ? "bg-[var(--maroon)] text-white"
                  : "bg-white text-[var(--maroon)] ring-1 ring-[rgba(179,139,44,0.35)] hover:bg-[var(--gold)]/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <p>Loading menu…</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it) => (
            <DishCard key={it.id} item={it} />
          ))}
        </div>
      )}
    </main>
  );
}


