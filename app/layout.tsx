import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JSONLD from "@/components/JSONLD";
import { BUSINESS_CONFIG } from "@/components/businessConfig";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BUSINESS_CONFIG.name} | ${BUSINESS_CONFIG.tagline}`,
  description: BUSINESS_CONFIG.description,
  keywords: [
    "digital marketing agency",
    "performance marketing",
    "meta ads",
    "google ads",
    "ai automation",
    "video editing",
    "digital marketing course jaipur",
    "seo services jaipur",
    "lead generation agency jaipur",
    "thebusygrowth",
    "busygrowth"
  ],
  metadataBase: new URL(BUSINESS_CONFIG.websiteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BUSINESS_CONFIG.name} | ${BUSINESS_CONFIG.tagline}`,
    description: BUSINESS_CONFIG.description,
    type: "website",
    locale: "en_IN",
    url: BUSINESS_CONFIG.websiteUrl,
    siteName: BUSINESS_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_CONFIG.name} | ${BUSINESS_CONFIG.tagline}`,
    description: BUSINESS_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/icon-32x32.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050c1a] text-slate-100 selection:bg-[#00a651]/20 selection:text-[#0d60c4] transition-colors duration-300">
        <JSONLD type="Organization" />
        <JSONLD type="LocalBusiness" />
        <JSONLD type="WebSite" />
        <ClientLayout>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ClientLayout>
      </body>
    </html>
  );
}

