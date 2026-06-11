import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Tilt_Neon } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { BUSINESS } from "@/data/business";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const tiltNeon = Tilt_Neon({
  variable: "--font-tilt-neon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BUSINESS.name} — Vape Shop in Cantonment, FL | Hwy 29`,
  description: `Family-owned vape shop on Highway 29 in Cantonment, FL since ${BUSINESS.foundedYear}. Disposables, mods, tanks, coils & 100+ e-liquid flavors. Open 7 days, 8 AM–9 PM. Throwdown Thursday deals weekly. ${BUSINESS.rating}★ on Google. 21+`,
  keywords: [
    "vape shop Cantonment FL",
    "vape shop Highway 29",
    "vape shop Pensacola",
    "disposable vapes Cantonment",
    "MJM Vapor Connection",
  ],
  openGraph: {
    title: `${BUSINESS.name} — All Your Vaping Needs`,
    description: `Cantonment's vape shop since ${BUSINESS.foundedYear}. ${BUSINESS.rating}★ · 171 Google reviews · Open 7 days.`,
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${tiltNeon.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col bg-smoke text-cream">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
