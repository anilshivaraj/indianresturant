"use client";

import { useEffect, useState } from "react";
import DishCard, { DishItem } from "@/components/DishCard";

export default function MenuPage() {
  const [items, setItems] = useState<DishItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="py-10">
      <h1 className="heading-serif text-3xl md:text-4xl text-[var(--maroon)] mb-6">Our Menu</h1>
      {loading ? (
        <p>Loading menu…</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <DishCard key={it.id} item={it} />
          ))}
        </div>
      )}
    </main>
  );
}


