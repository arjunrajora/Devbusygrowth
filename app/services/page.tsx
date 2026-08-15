import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { BUSINESS_CONFIG } from "@/components/businessConfig";

export const metadata: Metadata = {
  title: `Growth Services | Digital Marketing, Ads, Reels & AI Automation — ${BUSINESS_CONFIG.name}`,
  description: "Comprehensive growth services including Meta & Google Ads management, short-form video editing & Reels, AI automation nodes, lead generation funnels, and SEO optimization.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Growth Services | Digital Marketing, Ads, Reels & AI Automation — ${BUSINESS_CONFIG.name}`,
    description: "Meta & Google Ads, video editing, Reels scripting, AI automation workflows, and high-converting lead generation funnels.",
    url: `${BUSINESS_CONFIG.websiteUrl}/services`,
    siteName: BUSINESS_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
