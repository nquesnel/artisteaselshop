import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Artist Easel Shop | Premium Easels & Studio Supplies",
    template: "%s | Artist Easel Shop",
  },
  description:
    "Premium easels, brushes, and studio supplies for artists who demand the best. Bulk pricing available for schools and studios.",
  metadataBase: new URL("https://artisteaselshop.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Artist Easel Shop",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-warm-white text-charcoal antialiased">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
