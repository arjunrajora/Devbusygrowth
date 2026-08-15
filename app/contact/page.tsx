import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { BUSINESS_CONFIG } from "@/components/businessConfig";

export const metadata: Metadata = {
  title: `Contact Us | Get a Custom Growth Blueprint — ${BUSINESS_CONFIG.name}`,
  description: "Connect with performance marketing operators at TheBusyGrowth in Jaipur to scale your Meta & Google ad ROAS, Reels video editing, and AI lead automation.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact Us | Get a Custom Growth Blueprint — ${BUSINESS_CONFIG.name}`,
    description: "Book a growth strategy call with performance marketing operators to scale your business leads and ad return.",
    url: `${BUSINESS_CONFIG.websiteUrl}/contact`,
    siteName: BUSINESS_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
