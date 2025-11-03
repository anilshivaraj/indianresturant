"use client";

import Image from "next/image";
import { useCart } from "@/app/providers";

export interface DishItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
}

export default function DishCard({ item }: { item: DishItem }) {
  const { add } = useCart();
  return (
    <div className="card-leaf rounded-2xl overflow-hidden">
      <div className="relative h-44 w-full">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="heading-serif text-lg text-[var(--maroon)]">{item.name}</h3>
            <p className="text-sm text-[var(--coffee)]/80">{item.description}</p>
          </div>
          <div className="shrink-0 rounded-full bg-[var(--gold)]/10 px-3 py-1 text-[var(--maroon)] font-semibold">
            ₹{item.price}
          </div>
        </div>
        <button
          className="w-full btn-primary"
          onClick={() => add({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl }, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}


