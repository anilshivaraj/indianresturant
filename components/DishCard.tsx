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
    <div className="card-leaf rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow">
      <div className="relative h-48 w-full">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[var(--maroon)] ring-1 ring-[rgba(179,139,44,0.25)]">₹{item.price}</div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="heading-serif text-lg text-[var(--maroon)]">{item.name}</h3>
            <p className="text-sm text-[var(--coffee)]/80">{item.description}</p>
          </div>
        </div>
        <button
          className="w-full inline-flex items-center justify-center rounded-full px-5 py-2.5 text-white shadow-md transition duration-200 ease-out bg-[var(--maroon)] hover:brightness-110"
          onClick={() => add({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl }, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}


