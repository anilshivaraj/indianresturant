import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientShell from "./ClientShell";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Annapoorna - South Indian Restaurant",
  description: "Authentic South Indian flavors: Idly, Dosa, Vada, Pongal, Coffee & Tea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} antialiased bg-[var(--cream)] text-[var(--charcoal)]`}>
        <CartProvider>
          <ClientShell>
            <div className="min-h-dvh flex flex-col">
              <Navbar />
              <main className="flex-1">
                <div className="mx-auto max-w-6xl px-4">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </ClientShell>
        </CartProvider>
      </body>
    </html>
  );
}
