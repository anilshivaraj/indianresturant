"use client";

import Image from "next/image";
import Link from "next/link";

interface Promo {
  title: string;
  subtitle?: string;
  cta?: string;
  href?: string;
  image: string;
}

const promos: Promo[] = [
  {
    title: "Breakfast Combo",
    subtitle: "Idly + Vada + Coffee",
    cta: "Order Now",
    href: "/menu",
    image:
      "https://images.pexels.com/photos/5410404/pexels-photo-5410404.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Dosa Festival",
    subtitle: "Crispy, golden, and fresh",
    cta: "Explore Dosas",
    href: "/menu",
    image:
      "https://images.pexels.com/photos/793765/pexels-photo-793765.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Filter Coffee Refill",
    subtitle: "Add a refill for just ₹15",
    cta: "Grab Coffee",
    href: "/menu",
    image:
      "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export default function PromoStrip() {
  return (
    <div className="-mx-4 mb-4 md:mb-6">
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
        {promos.map((p, i) => (
          <article
            key={i}
            className="relative h-36 w-[85%] shrink-0 overflow-hidden rounded-2xl shadow ring-1 ring-[rgba(179,139,44,0.25)] sm:h-40 sm:w-[480px]"
            aria-label={p.title}
          >
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 85vw, 480px"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center p-4">
              <div className="max-w-[70%] text-white">
                <h3 className="heading-serif text-lg leading-tight">{p.title}</h3>
                {p.subtitle ? (
                  <p className="text-xs text-white/85">{p.subtitle}</p>
                ) : null}
                {p.cta && p.href ? (
                  <Link
                    href={p.href}
                    className="mt-2 inline-flex rounded-full bg-[var(--maroon)] px-3 py-1.5 text-xs font-semibold text-white shadow hover:brightness-110"
                  >
                    {p.cta}
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}


