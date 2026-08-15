import type { Metadata } from "next";
import CourseClient from "./CourseClient";
import { BUSINESS_CONFIG } from "@/components/businessConfig";

export const metadata: Metadata = {
  title: `Digital Marketing Mentorship & Training Course | ${BUSINESS_CONFIG.name}`,
  description: "Master performance marketing, AI funnels, Reels video editing, SEO, and paid ads in our 20-week mentorship program with active operators in Jaipur.",
  alternates: {
    canonical: "/course",
  },
  openGraph: {
    title: `Digital Marketing Mentorship & Training Course | ${BUSINESS_CONFIG.name}`,
    description: "Learn performance marketing, AI funnels, Reels video editing, SEO, and paid ads in our 20-week live mentorship program.",
    url: `${BUSINESS_CONFIG.websiteUrl}/course`,
    siteName: BUSINESS_CONFIG.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function CoursePage() {
  return <CourseClient />;
}
