import Link from "next/link";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <main className="py-10">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h1 className="heading-serif text-4xl md:text-5xl font-semibold text-[var(--maroon)]">
            Authentic South Indian Flavours
          </h1>
          <p className="text-[var(--coffee)]/90 text-lg">
            From fluffy Idly and crispy Dosa to comforting Pongal, savour the taste of home.
          </p>
          <div className="flex gap-3 pt-2">
            <Link href="/menu" className="btn-primary">Explore Menu</Link>
            <Link href="/cart" className="inline-flex items-center justify-center rounded-full px-5 py-2.5 ring-1 ring-[var(--maroon)] text-[var(--maroon)] transition hover:bg-[var(--maroon)] hover:text-white">View Cart</Link>
          </div>
        </div>
        <Carousel />
      </section>
    </main>
  );
}
