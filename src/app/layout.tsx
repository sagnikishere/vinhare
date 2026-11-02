import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vinhare.com"),
  title: "VINHARE HOTEL & RESORT | Luxury Hospitality in Bihar, India",
  description:
    "One Group. Multiple Destinations. Creating Experiences. Delivering Excellence. Discover Shiv Garden Resort, J.P. Resort, Resort Raj & Mithila Marriage Services.",
  keywords: [
    "Vinhare Hotel & Resort",
    "Luxury Resorts Bihar",
    "Shiv Garden Resort",
    "J.P. Resort",
    "Resort Raj",
    "Mithila Marriage Services",
    "Bihar Weddings",
    "Luxury Hospitality India",
  ],
  authors: [{ name: "Vinhare Hospitality Group" }],
  openGraph: {
    title: "VINHARE HOTEL & RESORT — Creating Experiences. Delivering Excellence.",
    description: "Immersive 3D luxury hospitality group in Bihar, India.",
    url: "https://vinhare.com",
    siteName: "Vinhare Hotel & Resort",
    images: [
      {
        url: "/images/hero_resort.jpg",
        width: 1200,
        height: 630,
        alt: "Vinhare Hotel & Resort",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} dark`}
    >
      <body className="min-h-screen bg-[#0D0C0B] text-[#FDFBF7] antialiased selection:bg-[#D4AF37] selection:text-[#0D0C0B]">
        {children}
      </body>
    </html>
  );
}
