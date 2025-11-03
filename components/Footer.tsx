export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-white/70">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-[var(--coffee)] flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Annapoorna. All rights reserved.</p>
        <p className="text-xs">
          Images from <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline">Pexels</a> / <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="underline">Unsplash</a>.
        </p>
      </div>
    </footer>
  );
}


