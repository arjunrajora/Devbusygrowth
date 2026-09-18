import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { BUSINESS_CONFIG } from "@/components/businessConfig";

export const metadata: Metadata = {
  title: `${BUSINESS_CONFIG.name} | AI-Powered Digital Marketing & Growth Engine`,
  description: "Scale your business with high-ROAS Meta & Google Ads, viral Reels video editing, AI WhatsApp automations, lead generation funnels, and performance marketing courses in Jaipur.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BUSINESS_CONFIG.name} | AI-Powered Digital Marketing & Growth Engine`,
    description: "Scale your business with high-ROAS Meta & Google Ads, viral Reels video editing, AI WhatsApp automations, lead generation funnels, and performance marketing courses.",
    url: BUSINESS_CONFIG.websiteUrl,
    siteName: BUSINESS_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_CONFIG.name} | AI-Powered Digital Marketing & Growth Engine`,
    description: "Scale your business with high-ROAS Meta & Google Ads, viral Reels video editing, AI WhatsApp automations, and lead generation funnels.",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
