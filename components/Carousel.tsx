"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    url: "https://images.pexels.com/photos/5410404/pexels-photo-5410404.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Idly with chutney and sambar",
  },
  {
    url: "https://images.pexels.com/photos/793765/pexels-photo-793765.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Crispy masala dosa",
  },
  {
    url: "https://images.pexels.com/photos/6529890/pexels-photo-6529890.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Vada snack",
  },
  {
    url: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Filter coffee",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-[color-mix(in_oklab,var(--gold)_25%,transparent)] sm:h-80 md:h-96">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.url}
            alt={s.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        </div>
      ))}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-6 rounded-full transition-colors ${i === index ? "bg-[var(--gold)]" : "bg-white/60"}`}
          />)
        )}
      </div>
    </div>
  );
}


